import { LitElement, html, css } from "lit";

class AppInput extends LitElement {
  static properties = {
    color: { type: String },
    icon: { type: String },
    fill: { type: String },
    stroke: { type: String },
    label: { type: String },
    name: { type: String },
    value: { type: String },
  };

  constructor() {
    super();
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
    return html`
      <div class="app-input">
        <input
          type="text"
          placeholder=${this.label}
          .value="${this.value || ""}"
          @input="${this.inputHandler}"
        />
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      flex-grow: 1;
    }
    .app-input {
      color: red;
      display: flex;
      flex-grow: 1;
      input {
        flex-grow: 1;
        padding: 5px 10px;
        border-width: 1px;
        border-radius: 20px;
        font-size: calc(min(16px, 2vmin));
      }
      input:focus {
        outline-color: var(--warning-color);
      }
      input::placeholder {
        color: var(--shade-color);
      }
    }
  `;
}

customElements.define("app-input", AppInput);
