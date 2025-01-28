import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import store, { addEmployee, editEmployee } from "../store";
import { Router } from "@vaadin/router";
import { translate } from "lit-translate";

class CreateView extends connect(store)(LitElement) {
  static properties = {
    header: { type: String },
    editEmployee: { type: Object },
  };

  constructor() {
    super();
    this.header = "Create New Employee";
  }

  stateChanged(state) {
    this.editEmployee = state.app.editEmployee;
  }

  handleSubmit(event) {
    const employee = event.detail;
    if (employee && employee.id) {
      store.dispatch(editEmployee(employee));
    } else if (employee) {
      store.dispatch(addEmployee(employee));
    }
    Router.go("/");
  }

  render() {
    return html`<div class="create-view">
      <div class="page-header">
        <p>${translate("create.header")}</p>
      </div>
      <div class="page-content">
        <employee-form
          .employee=${this.editEmployee}
          @form-submitted=${this.handleSubmit}
        ></employee-form>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      display: flex;
      height: 100%;
    }
    .create-view {
      padding: var(--spacing) calc(2 * var(--spacing));
      height: calc(100% - 2 * var(--spacing));
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .page-header {
        font-size: 1.5em;
        text-align: center;
      }

      .page-content {
        flex-grow: 1;
        margin: calc(2 * var(--spacing)) 0;
      }
    }
  `;
}

customElements.define("create-view", CreateView);
