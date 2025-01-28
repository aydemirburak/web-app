import { css, LitElement, html } from "lit";
import { translate } from "lit-translate";

const departmentOptions = ["Analytics", "Tech"];
const positionOptions = ["Junior", "Medior", "Senior"];

class EmployeeForm extends LitElement {
  static properties = {
    header: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: String },
    employmentDate: { type: String },
    phone: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String },
    errors: { type: Object },
    employee: { type: Object },
    editMode: { type: Boolean },
    showPopup: { type: Boolean },
  };
  constructor() {
    super();
    this.errors = {};
    this.editMode = false;
    this.showPopup = false;
    this.position = "";
    this.department = "";
  }
  updated(changedProperties) {
    if (changedProperties.has("employee")) {
      if (this.employee) {
        this.firstName = this.employee.firstName;
        this.lastName = this.employee.lastName;
        this.birthDate = this.employee.birthDate;
        this.employmentDate = this.employee.employmentDate;
        this.phone = this.employee.phone;
        this.email = this.employee.email;
        this.position = this.employee.position;
        this.department = this.employee.department;
        this.editMode = true;
      }
    }
  }
  validateForm() {
    const errors = {};
    if (!this.firstName) {
      errors.firstName = "First name is required";
    }
    if (!this.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!this.birthDate) {
      errors.birthDate = "Birth date is required";
    } else if (!moment(this.birthDate, "DD/MM/YYYY", true).isValid()) {
      errors.birthDate = "Birth date is invalid";
    }
    if (!this.employmentDate) {
      errors.employmentDate = "Employment date is required";
    } else if (!moment(this.employmentDate, "DD/MM/YYYY", true).isValid()) {
      errors.employmentDate = "Employment date is invalid";
    }
    if (!this.phone) {
      errors.phone = "Phone is required";
    }
    if (!this.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      errors.email = "Email is invalid";
    }
    if (!this.position) {
      errors.position = "Position is required";
    } else if (!positionOptions.includes(this.position)) {
      errors.position = "Position is invalid";
    }
    if (!this.department) {
      errors.department = "Department is required";
    } else if (!departmentOptions.includes(this.department)) {
      errors.department = "Department is invalid";
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  getConfirmation() {
    if (this.validateForm()) {
      this.showPopup = true;
    }
  }

  handleSubmit(event) {
    this.showPopup = false;
    if (this.validateForm()) {
      const newEmployee = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        employmentDate: this.employmentDate,
        phone: this.phone,
        email: this.email,
        department: this.department,
        position: this.position,
        id: this.employee?.id,
      };
      this.dispatchEvent(
        new CustomEvent("form-submitted", {
          detail: newEmployee,
        })
      );
    } else {
      console.log("Form has errors:", this.errors);
    }
  }

  handleValue(event) {
    event.preventDefault();
    const { name, value } = event.detail;
    this[name] = value;
  }

  render() {
    return html`
      <div class="employee-form">
        <form class="create-form">
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"firstName"}
              .label=${translate("home.firstName")}
              .value=${this.firstName}
            ></app-input>
            ${this.errors.firstName
              ? html`<span class="error">${this.errors.firstName}</span>`
              : ""}
          </div>
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"lastName"}
              .label=${translate("home.lastName")}
              .value=${this.lastName}
            ></app-input>
            ${this.errors.lastName
              ? html`<span class="error">${this.errors.lastName}</span>`
              : ""}
          </div>
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"birthDate"}
              .label=${translate("home.birthDateFormat")}
              .value=${this.birthDate}
            ></app-input>
            ${this.errors.birthDate
              ? html`<span class="error">${this.errors.birthDate}</span>`
              : ""}
          </div>
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"employmentDate"}
              .label=${translate("home.employmentDateFormat")}
              .value=${this.employmentDate}
            ></app-input>
            ${this.errors.employmentDate
              ? html`<span class="error">${this.errors.employmentDate}</span>`
              : ""}
          </div>
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"phone"}
              .label=${translate("home.phone")}
              .value=${this.phone}
            ></app-input>
            ${this.errors.phone
              ? html`<span class="error">${this.errors.phone}</span>`
              : ""}
          </div>
          <div>
            <app-input
              @value-changed=${this.handleValue}
              .name=${"email"}
              .label=${translate("home.email")}
              .value=${this.email}
            ></app-input>
            ${this.errors.email
              ? html`<span class="error">${this.errors.email}</span>`
              : ""}
          </div>
          <div>
            <app-dropdown
              .options=${departmentOptions}
              .label=${translate("home.department")}
              name="department"
              @value-changed=${this.handleValue}
              .value=${this.department}
            ></app-dropdown>
            ${this.errors.department
              ? html`<span class="error">${this.errors.department}</span>`
              : ""}
          </div>
          <div>
            <app-dropdown
              .options=${positionOptions}
              .label=${translate("home.position")}
              name="position"
              @value-changed=${this.handleValue}
              .value=${this.position}
            ></app-dropdown>
            ${this.errors.position
              ? html`<span class="error">${this.errors.position}</span>`
              : ""}
          </div>
          <div class="create-button">
            <app-button
              @click=${this.getConfirmation}
              .label=${translate("home.submit")}
              type="submit"
              color="primary"
            ></app-button>
          </div>
        </form>
        <confirmation-popup
          .isVisible=${this.showPopup}
          @popup-closed=${() => (this.showPopup = false)}
          @popup-confirmed=${this.handleSubmit}
        ></confirmation-popup>
      </div>
    `;
  }

  static styles = css`
    .employee-form {
      .create-form {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        div {
          width: 40%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-bottom: 5px;
          padding: 5px;
        }
      }
      .error {
        color: red;
        margin-top: 5px;
        font-size: 0.8em;
      }
    }
  `;
}

customElements.define("employee-form", EmployeeForm);
