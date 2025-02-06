import type { Lang, Options, Configuration } from "./types";

export const options: Options = {
  multiple: false,
  data: undefined,
  fetch: undefined,
  fromCountries: undefined,
  selectClass: "form-select",
  inputClass: "",
  optionsContainerClass: "",
  optionsClass: "",
  optionsGroupClass: "",
  openListOnHover: false,
  activeOptionColorDark: "#52525e",
  activeOptionColorLight: "#e0e0e6",
  groupAddedCallback: undefined,
  optionAddedCallback: undefined,
  ClearedCallback: undefined,
  optionClearedCallback: undefined,
  searchCallback: undefined,
};

export const language: Lang = {
  locale: "en-US",
  empty: "No options available.",
  placeholderS: "Select an option.",
  placeholderM: "Select multiple options.",
  searchPlaceholder: "Search...",
  fetch: "Search to display options.",
  noResults: "No coincidences for {search}.",
  loading: "Loading",
  noGroup: "No Group",
};

export const configuration: Configuration = {
  onchange: [],
  optionList: { option_list: [], options: 0, groups: 0 },
  language: language,
};
