import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import store, { deleteEmployee, setEditEmployee } from "../store";
import { classMap } from "lit/directives/class-map.js";
import { deleteIcon } from "../components/svg/delete.icon";
import { editIcon } from "../components/svg/edit.icon";
import { Router } from "@vaadin/router";
import { translate } from "lit-translate";

const logo = new URL("../../assets/open-wc-logo.svg", import.meta.url).href;

class HomeView extends connect(store)(LitElement) {
  static properties = {
    employees: { type: Array },
    page: { type: Number },
    maxPage: { type: Number },
    showPopup: { type: Boolean },
    willBeDeletedId: { type: Number },
  };

  stateChanged(state) {
    this.employees = state.app.employees;
    this.maxPage = Math.ceil(this.employees.length / 10);
  }

  constructor() {
    super();
    this.employees = [];
    this.page = 1;
    this.maxPage = 1;
    this.showPopup = false;
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.maxPage) {
      this.page++;
    }
  }

  onClickEdit(employee) {
    store.dispatch(setEditEmployee(employee));
    Router.go("/create");
  }

  onClickDelete(employee) {
    this.showPopup = true;
    this.willBeDeletedId = employee.id;
  }

  handleSubmit() {
    this.showPopup = false;
    store.dispatch(deleteEmployee(this.willBeDeletedId));
  }

  render() {
    const employeeTemplates = [];
    for (
      let i = (this.page - 1) * 10;
      i < Math.min(10 * this.page, this.employees.length);
      i++
    ) {
      employeeTemplates.push(html` <tr>
        <td>${this.employees[i].id}</td>
        <td>${this.employees[i].firstName}</td>
        <td>${this.employees[i].lastName}</td>
        <td>${this.employees[i].birthDate}</td>
        <td>${this.employees[i].employmentDate}</td>
        <td>${this.employees[i].phone}</td>
        <td>${this.employees[i].email}</td>
        <td>${this.employees[i].department}</td>
        <td>${this.employees[i].position}</td>
        <td>
          <app-icon
            .icon=${editIcon}
            .stroke=${"primary"}
            @click=${{
              handleEvent: () => this.onClickEdit(this.employees[i]),
              once: true,
            }}
          ></app-icon
          ><app-icon
            .icon=${deleteIcon}
            .stroke=${"primary"}
            @click=${{
              handleEvent: () => this.onClickDelete(this.employees[i]),
              once: true,
            }}
          ></app-icon>
        </td>
      </tr>`);
    }
    const pageItems = [];

    for (let i = 1; i < this.maxPage + 1; i++) {
      const pageClasses = {
        "page-item": true,
        "page-item-display": this.page - 2 < i && i < this.page + 4,
        "page-item-after": this.page < this.maxPage - 4 && i == this.page + 3,
        "page-item-before": this.page > 3 && i == this.page - 1,
      };
      pageItems.push(html`<a
        class=${classMap(pageClasses)}
        @click=${() => (this.page = i)}
        ?disabled=${this.page === i}
        >${i}</a
      >`);
    }
    return html`
      <div class="home-view">
        <div class="page-header">
          <p>${translate("home.header")}</p>
        </div>
        <div class="page-content">
          <div class="employee-list-container">
            <div class="employee-list">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>${translate("home.firstName")}</th>
                    <th>${translate("home.lastName")}</th>
                    <th>${translate("home.birthDate")}</th>
                    <th>${translate("home.employmentDate")}</th>
                    <th>${translate("home.phone")}</th>
                    <th>${translate("home.email")}</th>
                    <th>${translate("home.department")}</th>
                    <th>${translate("home.position")}</th>
                    <th>${translate("home.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${employeeTemplates}
                </tbody>
              </table>
            </div>
            <div class="pagination">
              <div class="page-items">
                <div>
                  <a
                    class="page-item"
                    @click=${this.previousPage}
                    ?disabled=${this.page === 1}
                    ><</a
                  >
                </div>

                <div>${pageItems}</div>
                <div>
                  <a
                    class="page-item"
                    @click=${this.nextPage}
                    ?disabled=${this.page === this.maxPage}
                    >></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <confirmation-popup
          .isVisible=${this.showPopup}
          @popup-closed=${() => (this.showPopup = false)}
          @popup-confirmed=${this.handleSubmit}
        ></confirmation-popup>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      height: 100%;
      overflow: auto;
    }
    .home-view {
      padding: var(--spacing) calc(2 * var(--spacing));
      height: calc(100% - 2 * var(--spacing));
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .page-header {
        font-size: 1.5em;
        text-align: start;
      }

      .page-content {
        flex-grow: 1;
        margin: calc(2 * var(--spacing)) 0;
      }

      .employee-list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        .employee-list {
          background-color: var(--light-background);
          padding: var(--spacing);
          min-width: 720px;
          width: 100%;
          table {
            width: 100%;
            border-collapse: collapse;
          }
          tr {
            padding: 5px;
            height: 6vh;
            min-height: 30px;
            border-bottom: 1px solid var(--shade-color);
          }
          td {
            padding: 0 3px;
            color: var(--dark-color);
          }
        }

        .pagination {
          position: relative;
          padding: 20px 0;
          z-index: 6;
          .page-items {
            position: relative;
            width: 75vw;
            display: flex;
            justify-content: center;
            max-width: 700px;
            min-width: 600px;
            div {
              display: flex;
              justify-content: space-evenly;
              width: 50%;
              &:first-child {
                flex-grow: 1;
                justify-content: flex-end;
                width: 25%;
                margin-right: 10px;
              }
              &:last-child {
                flex-grow: 1;
                justify-content: flex-start;
                width: 25%;
                margin-left: 10px;
              }
            }
          }
          .page-item {
            transition: background 250ms;
            position: relative;
            display: inline-block;
            margin: 3px;
            height: 3vh;
            min-width: 3vh;
            line-height: 3vh;
            padding: 0;
            font-weight: 700;
            display: none;

            &:first-child,
            &:last-child,
            &:nth-child(2),
            &:nth-last-child(2) {
              display: inline-block;
            }
          }

          .page-item-display {
            display: inline-block;
          }
          .page-item-after {
            &:after {
              content: "...";
              position: absolute;
              right: -10px;
            }
          }
          .page-item-before {
            &:before {
              content: "...";
              position: absolute;
              left: -10px;
            }
          }

          .page-item:hover {
            background-color: #000;
          }
        }
      }
    }
  `;
}

customElements.define("home-view", HomeView);
