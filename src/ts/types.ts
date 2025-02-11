export type Options = {
  /* Signature symbol */
  [key: string]: unknown;
  /** Sets if is a multiple select @default undefined */
  multiple: boolean | undefined;
  /** Sets if shows info about options list @default true */
  showInfo: boolean;
  /** Sets the position of the info (top or bottom, left or right) @default 'bottom right' */
  showInfoPosition: string;
  /** Sets the local options list @default undefined */
  data: CustomOptionsList | undefined;
  /** To fetch external options list */
  fetch:
    | {
        /** URL */
        input: URL | string;
        /** An object with data to send in the fetch request
         * (always overrides the body of the init property) @default {}*/
        body: any;
        /** The initial number of options to show @default 0 */
        initialCount: number;
        /** Additional options of the fetch function (method, headers, ...)*/
        init?: RequestInit;
      }
    | undefined;
  /** Sets the countries as the options list */
  fromCountries:
    | {
        /** Countries source @default world_en */
        countries?: iso3166[];
        /** Additional options to modify the returned options list */
        options?: countriesOptions;
      }
    | undefined;
  /** Class for the select @default 'form-select' */
  selectClass: string;
  /** Additional class for search input @default '' */
  inputClass: string;
  /** Additional class for the container of the options @default '' */
  optionsContainerClass: string;
  /** Additional class for the options @default '' */
  optionsClass: string;
  /** Additional class for the tittle of the options group @default '' */
  optionsGroupClass: string;
  /** Shows the options if the select is hover @default false */
  openListOnHover: boolean;
  /** Color of the focused option for dark mode @default '#52525e' */
  activeOptionColorDark: string;
  /** Color of the focused option for light mode @default '#e0e0e6' */
  activeOptionColorLight: string;
  /** Function triggered after a group of option is added to the options list @default undefined */
  groupAddedCallback: GroupAddedCallback | undefined;
  /** Function triggered after an option is added to the options list @default undefined */
  optionAddedCallback: OptionAddedCallback | undefined;
  /** Function triggered after the selected option is cleared @default undefined */
  ClearedCallback: ClearedCallback | undefined;
  /** Function triggered after an option is cleared in a multiple select @default undefined */
  optionClearedCallback: OptionClearedCallback | undefined;
  /** Function triggered after search an option @default undefined */
  searchCallback: SearchCallback | undefined;
};

export type Configuration = {
  /** Event triggered when the options list changes @default [] */
  onchange: JSSelectEvent[];
  /** Option list of the select */
  optionList: CustomOptionsList;
  /** Messages language @default en */
  language: Lang;
};

export type Lang = {
  /** Language and region code (for more information see "BCP 47 language tags") */
  locale: string;
  /** Default empty options list message */
  empty: string;
  /** Default placeholder message (single option)*/
  placeholderS: string;
  /** Default placeholder message (multi option)*/
  placeholderM: string;
  /** Default search placeholder message */
  searchPlaceholder: string;
  /** Default message for fetch data source */
  fetch: string;
  /** Default empty option list message */
  noResults: string;
  /** Default loading message */
  loading: string;
  /** Default empty group name */
  noGroup: string;
  /** Default info message */
  info: string;
};

export type iso3166 = {
  /* Signature symbol */
  [key: string]: string;
  /** ISO 3166 Country/Territory name */
  CTname: string;
  /** Capital name */
  Capital: string;
  /** Continent name */
  Continent: string;
  /** ONU affiliation */
  ONU: string;
  /** ISO 3166-1 alpha 2 tag */
  "3166-1a2": string;
  /** ISO 3166-2 alpha3 tag */
  "3166-2a3": string;
  /** ISO 3166-3 tag */
  "3166-3": string;
  /** Unicode flag code as HTML entity */
  Flag: string;
  /** ISO 4217 currency name */
  Currency: string;
  /** ISO 4217 currency tag */
  ISO4217: string;
};

export type OptionList = {
  /** The value to show. */
  text: string;
  /** The value to return. */
  value: string;
};
export type OPTGroupList = {
  /** The tittle of the group. */
  title: string;
  /** The options list. */
  options: OptionList[];
};

export type CustomOptionsList = {
  /** The list of options groups and/or options. */
  option_list: (OptionList | OPTGroupList)[];
  /** The total of options. */
  options: number;
  /** The total of groups. */
  groups: number;
};

export type CustomSelect = {
  /** The main container element. */
  container: HTMLDivElement;
  /** The select equivalent element. */
  select: HTMLDivElement;
  /** The value container element. */
  value: HTMLDivElement;
  /** The clear element. */
  clear: HTMLDivElement;
  /** The dropdown container element. */
  dropdown: HTMLDivElement;
  /** The search container element. */
  search_container: HTMLDivElement;
  /** The search element. */
  input: HTMLInputElement;
  /** The label of the input element. */
  label: HTMLLabelElement;
  /** The container of the options groups and/or options */
  options_container: HTMLDivElement;
  /** The info message container */
  info: HTMLDivElement;
  /** The loading data element */
  loading: HTMLDivElement;
};

export type GroupAddedCallback = (
  /** The options group element. */
  group: HTMLDivElement,
  /** The tittle element of the group. */
  tittle: HTMLDivElement,
  /** The options group object. */
  optGroupList: OPTGroupList,
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The target select element. */
  target: HTMLSelectElement,
  /** The JSSelect options. */
  options: Options
) => void;

export type OptionAddedCallback = (
  /** The option element. */
  option: HTMLDivElement,
  /** The option object. */
  optionsList: OptionList,
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The target select element. */
  target: HTMLSelectElement,
  /** The JSSelect options. */
  options: Options
) => void;

export type ClearedCallback = (
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The target select element. */
  target: HTMLSelectElement,
  /** The JSSelect options. */
  options: Options
) => void;

export type OptionClearedCallback = (
  /** The option element. */
  option: HTMLDivElement,
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The target select element. */
  target: HTMLSelectElement,
  /** The JSSelect options. */
  options: Options
) => void;

export type SearchCallback = (
  /** The searched value. */
  value: string,
  filtered: CustomOptionsList,
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The target select element. */
  target: HTMLSelectElement,
  /** The JSSelect options. */
  options: Options
) => void;

export type JSSelectEvent = (
  /** The JSSelect object. */
  custom: CustomSelect,
  /** The JSSelect options. */
  option: OptionList
) => void;

export type countriesOptions = {
  /** Sets the group of the countries (available values: ONU, Continent, Currency) */
  group?: string;
  /** Sets the name of the property to show its value in the option */
  text?: string | ((countries: iso3166) => string);
  /** Sets the name of the property to use its value as the returned value of the option  */
  value?: string;
  /** Function to determine whether the country should be added */
  condition?: (countries: iso3166) => boolean;
};
