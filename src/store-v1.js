import { createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload.loanAmount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loanAmount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    case "customer/deleteCustomer":
      return initialStateCustomer;
    default:
      return state;
  }
}

const rootReducer = (state = {}, action) => {
  return {
    account: accountReducer(state.account, action),
    customer: customerReducer(state.customer, action),
  };
};

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 1000 });
// store.dispatch({ type: "account/withdraw", payload: 100 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { loanAmount: 1000, loanPurpose: "buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(loanAmount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: { loanAmount, loanPurpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(1000));
// store.dispatch(withdraw(100));
// store.dispatch(requestLoan(1000, "buy a car"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer", // "customer/createCustomer" by convention (namespace/action)
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: { fullName } };
}

function deleteCustomer() {
  return { type: "customer/deleteCustomer" };
}

store.dispatch(createCustomer("John Doe", "1234567890"));
store.dispatch(updateName("Jane Doe"));
console.log(store.getState());
