import { combineReducers } from "redux";

import localization from "./localizationReducer";
import browser from "./browserReducer";
import data from "./dataReducer";

export default combineReducers({
  localization,
  browser,
  data,
});
