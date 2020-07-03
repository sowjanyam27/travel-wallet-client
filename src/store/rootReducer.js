import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import trips from "./Homepage/reducer";
import trip from "./Addtrip/reducer";
import expenses from "./AddExpense/reducer";
import email from "./Email/reducer";

export default combineReducers({
  appState,
  user,
  trips,
  trip,
  expenses,
  email,
});
