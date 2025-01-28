import { html, LitElement, css } from "lit";
import { translate } from "lit-translate";

class ConfirmationPopup extends LitElement {
  static properties = {
    isVisible: { type: Boolean },
  };
  constructor() {
    super();
    this.isVisible = false;
  }
  confirm(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("popup-confirmed", {
        detail: { name: this.name, value: this.value },
      })
    );
  }
  close(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("popup-closed", {
        detail: { name: this.name, value: this.value },
      })
    );
  }
  render() {
    if (this.isVisible) {
      return html`<div class="popup is-visible" role="alert">
        <div class="popup-container">
          <div>
            <h1>${translate("component.sure")}</h1>
            <p>${translate("component.surex")}</p>
          </div>
          <div class="popup-buttons">
            <div>
              <app-button
                @click=${this.confirm}
                .label=${translate("component.proceed")}
                color="primary"
              ></app-button>
            </div>
            <div>
              <app-button
                @click=${this.close}
                .label=${translate("component.cancel")}
              ></app-button>
            </div>
          </div>
          <a @click=${this.close} class="popup-close img-replace"></a>
        </div>
      </div>`;
    } else {
      return html``;
    }
  }

  static styles = css`
    .popup {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(94, 110, 141, 0.9);
      opacity: 0;
      visibility: hidden;
      -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s;
      -moz-transition: opacity 0.3s 0s, visibility 0s 0.3s;
      transition: opacity 0.3s 0s, visibility 0s 0.3s;
    }
    .popup.is-visible {
      opacity: 1;
      visibility: visible;
      -webkit-transition: opacity 0.3s 0s, visibility 0s 0s;
      -moz-transition: opacity 0.3s 0s, visibility 0s 0s;
      transition: opacity 0.3s 0s, visibility 0s 0s;
    }

    .popup-container {
      position: relative;
      width: 90%;
      max-width: 400px;
      margin: 4em auto;
      background: #fff;
      border-radius: 0.25em 0.25em 0.4em 0.4em;
      text-align: center;
      display: flex;
      min-height: 30vh;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      -webkit-transform: translateY(-40px);
      -moz-transform: translateY(-40px);
      -ms-transform: translateY(-40px);
      -o-transform: translateY(-40px);
      transform: translateY(-40px);
      /* Force Hardware Acceleration in WebKit */
      -webkit-backface-visibility: hidden;
      -webkit-transition-property: -webkit-transform;
      -moz-transition-property: -moz-transform;
      transition-property: transform;
      -webkit-transition-duration: 0.3s;
      -moz-transition-duration: 0.3s;
      transition-duration: 0.3s;
    }
    .popup-container p {
      padding: 1em;
    }
    .popup-container .popup-buttons:after {
      content: "";
      display: table;
      clear: both;
    }
    .popup-container .popup-buttons li {
      float: left;
      width: 50%;
      list-style: none;
    }
    .popup-container .popup-buttons a {
      display: block;
      height: 60px;
      line-height: 60px;
      text-transform: uppercase;
      color: #fff;
      -webkit-transition: background-color 0.2s;
      -moz-transition: background-color 0.2s;
      transition: background-color 0.2s;
    }
    .popup-container .popup-buttons li:first-child a {
      background: #fc7169;
      border-radius: 0 0 0 0.25em;
    }
    .no-touch .popup-container .popup-buttons li:first-child a:hover {
      background-color: #fc8982;
    }
    .popup-container .popup-buttons li:last-child a {
      background: #b6bece;
      border-radius: 0 0 0.25em 0;
    }
    .no-touch .popup-container .popup-buttons li:last-child a:hover {
      background-color: #c5ccd8;
    }
    .popup-container .popup-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 30px;
      height: 30px;
    }
    .popup-container .popup-close::before,
    .popup-container .popup-close::after {
      content: "";
      position: absolute;
      top: 12px;
      width: 14px;
      height: 3px;
      background-color: #8f9cb5;
    }
    .popup-container .popup-close::before {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      left: 8px;
    }
    .popup-container .popup-close::after {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      right: 8px;
    }
    .is-visible .popup-container {
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
    .popup-buttons {
      width: 50%;
      min-height: 15vh;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    @media only screen and (min-width: 1170px) {
      .popup-container {
        margin: 8em auto;
      }
    }
  `;
}

customElements.define("confirmation-popup", ConfirmationPopup);
