import { configureStore, createSlice } from "@reduxjs/toolkit";

const dummyEmployeeData = {
  firstName: "Burak",
  lastName: "Doe",
  birthDate: "10/06/1991",
  employmentDate: "01/01/2025",
  phone: "5378747039",
  email: "burak@test.com",
  department: "Tech",
  position: "Junior",
};
const dummyData = [];
for (let i = 0; i < 15; i++) {
  dummyData.push({ id: i + 1, ...dummyEmployeeData });
}
const initialState = {
  header: "My app",
  employees: dummyData,
  editEmployee: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHeader: (state, action) => {
      state.header = action.payload;
    },
    setEditEmployee: (state, action) => {
      state.editEmployee = action.payload;
    },
    addEmployee: (state, action) => {
      const newEmployee = {
        ...action.payload,
        id: state.employees[state.employees.length - 1].id + 1,
      };
      state.employees.push(newEmployee);
    },
    editEmployee: (state, action) => {
      const employee = action.payload;
      state.employees.forEach((item) => {
        if (item.id === employee.id) {
          item.firstName = employee.firstName;
          item.lastName = employee.lastName;
          item.birthDate = employee.birthDate;
          item.employmentDate = employee.employmentDate;
          item.phone = employee.phone;
          item.email = employee.email;
          item.position = employee.position;
          item.department = employee.department;
        }
      });
      state.editEmployee = null;
    },
    deleteEmployee: (state, action) => {
      const employees = state.employees.filter(
        (item) => item.id !== action.payload
      );
      state.employees = employees;
    },
  },
});

export const {
  setHeader,
  setEditEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
