import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addExpense(data) {
  return {
    type: "ADD_EXPENSE",
    payload: data,
  };
}

export function allExpenses(data) {
  return {
    type: "ALL_EXPENSES",
    payload: data,
  };
}

export function allExpensesSummary(data) {
  return {
    type: "ALL_EXPENSES_SUMMARY",
    payload: data,
  };
}

export function allExpenseTypes(data) {
  return {
    type: "ALL_EXPENSE_TYPES",
    payload: data,
  };
}

export function allUserExpenses(data) {
  return {
    type: "ALL_USER_EXPENSES",
    payload: data,
  };
}

//API request for fetching all expenses for the trip
export function fetchAllExpensesofTrip(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/trip/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("output in fetchAllExpenses:", output.data);
    dispatch(allExpenses(output.data));
  };
}

//API request for posting new expense
export function postNewExpense(
  title,
  amount,
  expensetypeId,
  sharedBy,
  spentBy,
  tripId,
  token
) {
  return async function thunk(dispatch, getState) {
    console.log("expensetypeId:", expensetypeId, typeof expensetypeId);
    const output = await axios.post(
      `${apiUrl}/expense/${tripId}`,
      {
        title,
        amount,
        expensetypeId,
        sharedBy,
        spentBy,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output after posting:", output.data);
    dispatch(addExpense(output.data));
  };
}

// Aggregated expenses summary of each category
export function fetchAllExpensesSummary(id, token) {
  return async function thunk(dispatch, getState) {
    console.log("id in fetchallexpensesum:", typeof id, id);
    const output = await axios.get(`${apiUrl}/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("output in fetchAllExpensesSummary:", output);
    dispatch(allExpensesSummary(output.data));
  };
}

//API request for fetching all expenseTypes
export function fetchAllExpenseTypes(token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("expense types:", output);
    dispatch(allExpenseTypes(output.data));
  };
}

//API request for fetching all user expenses from userExpense table
export function fetchAllUserExpenses(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/userexpense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("expense types:", output);
    dispatch(allUserExpenses(output.data));
  };
}

//API request for deleting the expense
export function deleteExpenseDetails(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.delete(`${apiUrl}/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log("output", output);
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  };
}
