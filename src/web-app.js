import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit";
import { peopleIcon } from "./components/svg/people.icon.js";
import { plusIcon } from "./components/svg/plus.icon.js";
import { registerTranslateConfig, translate, use } from "lit-translate";

const logo = new URL("../assets/ing.png", import.meta.url).href;

registerTranslateConfig({
  loader: (lang) =>
    fetch(`./assets/localization/${lang}.json`).then((res) => res.json()),
});

use("en");

class WebApp extends LitElement {
  static properties = {
    lang: { type: String },
  };

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector("#outlet"));
    router.setRoutes([
      { path: "/", component: "home-view" },
      { path: "/create", component: "create-view" },
    ]);
    this.lang = document.documentElement.lang || "en";
    use(this.lang);
  }

  goCreate() {
    Router.go("/create");
  }

  goEmployees() {
    Router.go("/");
  }

  handleLanguage(lang) {
    use(lang);
  }

  constructor() {
    super();
    this.lang = "en";
  }

  render() {
    return html`
      <header class="app-header">
        <div class="app-logo">
          <img src="${logo}" alt="logo" />
          <p>ING</p>
        </div>
        <div class="app-actions">
          <div class="action-item">
            <app-icon .icon=${peopleIcon} .fill=${"primary"}></app-icon>
            <span>${translate("employees")}</span>
          </div>
          <div @click=${this.goCreate} class="action-item">
            <app-icon .icon=${plusIcon} .stroke=${"primary"}></app-icon>
            <span>${translate("new")}</span>
          </div>
          <div class="action-item">
            <div class="dropdown">
              <span class="dropbtn">Lang</span>
              <div class="dropdown-content">
                <a
                  @click=${{
                    handleEvent: () => this.handleLanguage("en"),
                    once: true,
                  }}
                  >EN</a
                >
                <a
                  @click=${{
                    handleEvent: () => this.handleLanguage("tr"),
                    once: true,
                  }}
                  >TR</a
                >
              </div>
            </div>
          </div>
        </div>
      </header>
      <main id="outlet"></main>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(min(14px, 2vmin));
      color: var(--base-color);
      text-align: center;
      background-color: var(--web-app-background-color);
    }

    main {
      width: 100%;
      height: 95vh;
    }
    .app-header {
      background-color: var(--light-background);
      height: 5vh;
      width: 100%;
      min-height: 40px;
      display: flex;
      .app-logo {
        display: flex;
        justify-content: center;
      }
      .app-actions {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .action-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px;
        }
      }
      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 5vw;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }

      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }
      .dropdown-content a:hover {
        background-color: var(--light-background);
      }

      .dropdown:hover .dropdown-content {
        display: block;
        position: absolute;
        right: 0;
      }

      .dropdown:hover .dropbtn {
        background-color: var(--shade-color);
      }
    }
  `;
}

customElements.define("web-app", WebApp);
