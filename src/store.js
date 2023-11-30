import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

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

store.dispatch(deposit(1000));
store.dispatch(withdraw(100));
store.dispatch(requestLoan(1000, "buy a car"));

console.log(store.getState());
