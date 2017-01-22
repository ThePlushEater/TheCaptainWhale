import axios from "axios";

import serverConfig from "./../config/server";

export function fetchLocalization() {
  let language = window.navigator.userLanguage || window.navigator.language ? window.navigator.userLanguage || window.navigator.language : "en";
  let file;
  if (language.toLowerCase().includes("en")) {
    file = "en.json";
  }
  return {
    type: "FETCH_LOCALIZATION",
    payload: axios.get(location.origin + serverConfig.uLocalization + file),
  }
}
