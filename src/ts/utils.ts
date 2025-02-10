import {
  OptionList,
  CustomOptionsList,
  OPTGroupList,
  Options,
  iso3166,
  countriesOptions,
} from "./types";

import { world_en } from "./lang/countries";

/**
 * Gets the list of options for the JSSelect from the available source.
 * @param {HTMLSelectElement} element The target select element.
 * @param {Options} options The JSSelect options.
 * @returns {Promise<CustomOptionsList>} Returns a promise with a list of options for the JSSelect.
 */
export async function getOptionList(
  element: HTMLSelectElement,
  options: Options
): Promise<CustomOptionsList> {
  const list: CustomOptionsList = { option_list: [], options: 0, groups: 0 };
  if (options.data) {
    if (!isCustomOptionsList(options.data)) {
      console.error(`JSSelect: The data object has not a valid format.`);
      return { option_list: [], options: 0, groups: 0 };
    } else return options.data;
  } else if (options.fetch?.input) {
    const ic = options.fetch.initialCount || 0;
    const body = { ...(options.fetch.body ?? {}) };
    if (ic > 0) return fetchData(options.fetch.input, body, options.fetch.init);
    return list;
  } else if (options.fromCountries)
    return fromCountries(
      options.fromCountries.countries,
      options.fromCountries.options
    );
  else return getFromTarget(element, list, 0, 0);
}

/**
 * Gets the list of options and options group from the target select (recursive).
 * @param {(HTMLSelectElement | HTMLOptGroupElement)} element The target select or options group element.
 * @param {CustomOptionsList} list The initial list of options for the JSSelect.
 * @param {number} oc total of options.
 * @param {number} gc total of groups.
 * @returns {CustomOptionsList} The list of options for the JSSelect.
 */
function getFromTarget(
  element: HTMLSelectElement | HTMLOptGroupElement,
  list: CustomOptionsList,
  oc: number,
  gc: number
): CustomOptionsList {
  const l = element.childNodes as NodeListOf<
    HTMLOptGroupElement | HTMLOptionElement
  >;
  Array.from(l).forEach((item) => {
    if (item instanceof HTMLOptGroupElement) {
      const g: CustomOptionsList = { option_list: [], options: oc, groups: gc };
      const o = getFromTarget(item, g, oc, gc);
      list.option_list.push({
        title: item.getAttribute("label") as string,
        options: o.option_list as OptionList[],
      });
      gc++;
      oc = o.options;
    } else if (item instanceof HTMLOptionElement) {
      oc++;
      list.option_list.push({
        value: item.value,
        text: item.textContent as string,
      });
    }
  });
  list.options = oc;
  list.groups = gc;
  return list;
}

/**
 * Search the value in the options .
 * @param {string} value The value to search.
 * @param {CustomOptionsList} list The list of options for the JSSelect.
 * @param {Options} options The JSSelect options.
 * @returns {Promise<CustomOptionsList>} Returns a promise with a filtered list of options for the JSSelect.
 */
export async function search(
  value: string,
  list: CustomOptionsList,
  options: Options
): Promise<CustomOptionsList> {
  if (options.fetch) {
    const body = { ...(options.fetch.body ?? {}), ...{ search: value } };
    return fetchData(options.fetch.input, body, options.fetch.init);
  } else {
    return localSearch(value, list);
  }
}

/**
 * Search in the list of options (local).
 * @param {string} value The value to search.
 * @param {CustomOptionsList} list The list of options for the JSSelect.
 * @returns {CustomOptionsList} Returns a filtered list of options for the JSSelect.
 */
export function localSearch(
  value: string,
  list: CustomOptionsList
): CustomOptionsList {
  let options = 0,
    groups = 0;
  if (value.trim().length == 0) return list;
  const f = list.option_list
    .map((item) => {
      const opt = item as OPTGroupList;
      const o = item as OptionList;
      if (opt.title) {
        const p = opt.options.filter((option) => {
          const o = option.value
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase());
          const t = option.text
            .toLocaleLowerCase()
            .replace(/<\/?[^>]+(>|$)/g, "")
            .includes(value.toLocaleLowerCase());
          if (o || t) return option;
        });
        if (p.length > 0) {
          options = options + p.length;
          groups++;
          return { title: opt.title, options: p };
        }
      } else if (o.value) {
        const p = o.value
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
        const t = o.text
          .toLocaleLowerCase()
          .replace(/<\/?[^>]+(>|$)/g, "")
          .includes(value.toLocaleLowerCase());
        if (p || t) {
          options++;
          return item;
        }
      }
      return undefined;
    })
    .filter((v) => v !== undefined);
  return { option_list: f, options: options, groups: groups };
}

/** Fetch data.
 * @param {(URL | string)} input The url.
 * @param {?RequestInit} [init] The request options.
 * @returns {Promise<CustomOptionsList>} Returns a promise with a list of options for the JSSelect.
 */
export async function fetchData(
  input: URL | string,
  body: any,
  init?: RequestInit
): Promise<CustomOptionsList> {
  const list: CustomOptionsList = { option_list: [], options: 0, groups: 0 };
  if (!init) init = {};
  init.body = { ...body };
  const method = init?.method && init.method == "POST";
  if ((init.body && Object.keys(init.body).length > 1) || method) {
    init.method = "POST";
    init.body = JSON.stringify(init.body);
  } else {
    init.method = "GET";
    init.body = undefined;
    if (typeof input != "string") input = input.toString();
    input += `?search=${body.search}`;
  }
  const response = await fetch(input, init);
  if (response.ok) {
    const json = await response.json();
    if (!isCustomOptionsList(json))
      console.error(`JSSelect: The response object has not a valid format.`);
    else {
      list.option_list = json.option_list;
      list.options = json.options;
      list.groups = json.groups;
    }
  } else
    console.error(
      `JSSelect: Failed to fetch data, status code:${response.status} (${response.statusText}).`
    );
  return list;
}

/**
 * Checks if the value is of type CustomOptionsList.
 * @param {*} obj Value to check.
 * @returns {obj is CustomOptionsList} Returns true if is a CustomOptionsList, otherwise false.
 */
export function isCustomOptionsList(obj: any): obj is CustomOptionsList {
  if (
    typeof obj !== "object" ||
    obj === null ||
    typeof obj.options !== "number" ||
    typeof obj.groups !== "number" ||
    !Array.isArray(obj.option_list)
  )
    return false;
  return obj.option_list.every((item: any) => {
    if (typeof item !== "object" || item === null) return false;

    if ("text" in item && "value" in item)
      return typeof item.text === "string" && typeof item.value === "string";

    if ("title" in item && "options" in item)
      return (
        typeof item.title === "string" &&
        Array.isArray(item.options) &&
        item.options.every(
          (opt: any) =>
            typeof opt.text === "string" && typeof opt.value === "string"
        )
      );

    return false;
  });
}

/**
 * Groups the countries according to the specified property.
 * @param {iso3166[]} c_list List of countries.
 * @param {string} group The group name.
 * @returns {{ [key: string]: iso3166[] }} The grouped countries.
 */
export function makeGroups(
  c_list: iso3166[],
  group: string
): { [key: string]: iso3166[] } {
  let g: { [key: string]: iso3166[] } = {};
  c_list.forEach((c) => {
    const onu = c[group] == "YES" ? "ONU" : "NO ONU";
    const name = group == "ONU" ? onu : c[group];
    if (g[name]) g[name].push(c);
    else
      Object.defineProperty(g, name, {
        value: [c],
      });
  });
  return g;
}

/**
 * Create a list of options from the list of countries.
 * @param {?iso3166[]} [countries] List of countries.
 * @param {?countriesOptions} [options] The customization options.
 * @returns {CustomOptionsList} Returns the list of options.
 */
export function fromCountries(
  countries?: iso3166[],
  options?: countriesOptions
): CustomOptionsList {
  const c_list = countries || world_en;
  const list: CustomOptionsList = { option_list: [], options: 0, groups: 0 };
  let group: string | undefined,
    text = "CTname",
    value = "CTname",
    o = 0,
    g = 0;
  if (
    options?.group &&
    ["ONU", "Continent", "Currency"].includes(options.group)
  )
    group = options.group;
  if (!group) {
    c_list.forEach((c) => {
      if (options?.text && typeof options.text == "function")
        list.option_list.push({ text: options.text(c), value: c[value] });
      else list.option_list.push({ text: c[text], value: c[value] });
      o++;
    });
  } else {
    const gl = makeGroups(c_list, group);
    const name = Object.getOwnPropertyNames(gl);
    name.forEach((n) => {
      const op: OptionList[] = [];
      gl[n].forEach((i) => {
        if (options?.text && typeof options.text == "function")
          op.push({ text: options.text(i), value: i[value] });
        else op.push({ text: i[text], value: i[value] });
        o++;
      });
      list.option_list.push({ title: n, options: op });
      g++;
    });
  }
  list.options = o;
  list.groups = g;
  console.log(list);
  return list;
}

/**
 * Reduce the total of options in the options list to the specified limit.
 * @param {CustomOptionsList} list The options list.
 * @param {number} limit The maximum number of options.
 * @returns {CustomOptionsList} The reduced options list.
 */
export function reduceOptions(
  list: CustomOptionsList,
  limit: number
): CustomOptionsList {
  const r_list: CustomOptionsList = {
    option_list: [],
    options: limit,
    groups: 0,
  };
  let g = 0,
    max = limit;
  for (let i = 0; i <= list.options; i++) {
    if (max == 0) break;
    const item = list.option_list[i];
    const opt = item as OPTGroupList;
    if (opt.title != undefined && opt.options != undefined) {
      const gp: OPTGroupList = { title: opt.title, options: [] };
      for (let j = 0; j <= opt.options.length; j++) {
        if (max == 0) break;
        const element = opt.options[j];
        gp.options.push(element);
        max--;
      }
      r_list.option_list.push(gp);
      g++;
    } else {
      r_list.option_list.push(item);
      max--;
    }
  }
  r_list.options = limit;
  r_list.groups = g;
  return r_list;
}
