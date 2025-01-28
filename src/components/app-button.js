import { LitElement, html, css } from "lit";

class AppButton extends LitElement {
  static properties = {
    color: { type: String },
    icon: { type: String },
    fill: { type: String },
    stroke: { type: String },
    label: { type: String },
    type: { type: String },
  };

  constructor() {
    super();
  }

  updated(changedProperties) {
    if (changedProperties.has("color")) {
      const button = this.shadowRoot.querySelector("button");
      let color = "initial";
      let background = "";
      let borderColor = "var(--border-color)";
      switch (this.color) {
        case "primary":
          color = "var(--light-background)";
          background = "var(--base-color)";
          borderColor = "var(--base-color)";
          break;
        default:
          background = "var(--light-background)";
          break;
      }
      button.style.color = color;
      button.style.backgroundColor = background;
      button.style.borderColor = borderColor;
    }
  }

  render() {
    return html`
      <div class="app-button">
        <button type=${this.type || "button"}>${this.label}</button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .app-button {
      width: 100%;
      button {
        width: 100%;
        padding: 5px 10px;
        border-width: 1px;
        border-radius: 5px;
        font-size: calc(min(16px, 2vmin));
        outline: none;
      }
    }
  `;
}

customElements.define("app-button", AppButton);
