import { LitElement, html, css } from "lit";

class AppIcon extends LitElement {
  static properties = {
    color: { type: String },
    icon: { type: String },
    fill: { type: String },
    stroke: { type: String },
  };

  constructor() {
    super();
  }

  updated(changedProperties) {
    if (changedProperties.has("color")) {
      const svg = this.shadowRoot.querySelectorAll("path");
      let color = "";
      switch (this.color) {
        case "primary":
          color = "var(--warning-color)";
          break;
        default:
          color = "blue";
          break;
      }
      svg.forEach((item) => {
        item.style.color = color;
      });
    }
    if (changedProperties.has("fill")) {
      const svg = this.shadowRoot.querySelectorAll("path");
      let color = "";
      switch (this.fill) {
        case "primary":
          color = "var(--warning-color)";
          break;
        default:
          color = "blue";
          break;
      }
      svg.forEach((item) => {
        item.style.fill = color;
      });
    }
    if (changedProperties.has("stroke")) {
      const svg = this.shadowRoot.querySelectorAll("path");
      let color = "";
      switch (this.stroke) {
        case "primary":
          color = "var(--base-color)";
          break;
        default:
          color = "blue";
          break;
      }
      svg.forEach((item) => {
        item.style.stroke = color;
      });
    }
  }

  render() {
    return html` <div class="app-icon">${this.icon}</div> `;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    .app-icon {
      cursor: pointer;
    }
  `;
}

customElements.define("app-icon", AppIcon);
