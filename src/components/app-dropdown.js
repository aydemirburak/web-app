import { LitElement, html, css } from "lit";
import { translate } from "lit-translate";

class AppDropdown extends LitElement {
  static properties = {
    color: { type: String },
    icon: { type: String },
    fill: { type: String },
    stroke: { type: String },
    label: { type: String },
    options: { type: Array },
    value: { type: String },
    name: { type: String },
  };

  constructor() {
    super();
    this.value = "";
  }

  updated(changedProperties) {
    if (changedProperties.has("color")) {
    }
  }

  inputHandler(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { name: this.name, value: this.value },
      })
    );
  }

  render() {
    const optionTemplates = [];
    for (let i = 0; i < this.options.length; i++) {
      optionTemplates.push(
        html` <option value=${this.options[i]}>${this.options[i]}</option>`
      );
    }

    return html`
      <div class="app-dropdown">
        <select .value=${this.value} @input="${this.inputHandler}" required>
          <option value="" disabled selected hidden>
            ${translate("component.choose")} ${this.label}
          </option>
          ${optionTemplates}
        </select>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .app-dropdown {
      width: 100%;
      color: red;
      select {
        width: 100%;
        padding: 5px 10px;
        border-width: 1px;
        border-radius: 20px;
        font-size: calc(min(16px, 2vmin));
        appearance: none;
      }
      select {
        background-image: linear-gradient(45deg, transparent 50%, gray 50%),
          linear-gradient(135deg, gray 50%, transparent 50%),
          linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 20px) calc(1em + 2px),
          calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0;
        background-size: 5px 5px, 5px 5px, 1px 2em;
        background-position-y: center;
        background-repeat: no-repeat;
        &:not(:focus):invalid {
          color: var(--shade-color);
        }
      }
      select:focus {
        outline-color: var(--warning-color);
      }
      div {
        width: 100%;
      }
    }
  `;
}

customElements.define("app-dropdown", AppDropdown);
