import {
  Configuration,
  CustomOptionsList,
  Options,
  OptionList,
  OPTGroupList,
  CustomSelect,
} from "./types";
import { getOptionList, isCustomOptionsList, search } from "./utils";

/**
 * Create a JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options The JSSelect options.
 * @returns {CustomSelect} Returns the JSSelect object.
 */
export function customSelect(
  target: HTMLSelectElement,
  config: Configuration,
  options: Options
): CustomSelect {
  let custom = structure(target, config, options);
  custom = customSelectEvents(target, custom, config, options);
  return custom;
}

/**
 * Create the JSSelect structure.
 * @param {HTMLSelectElement} target The target select element.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options  The JSSelect options.
 * @returns {CustomSelect} returns te JSSelect object.
 */
function structure(
  target: HTMLSelectElement,
  config: Configuration,
  options: Options
): CustomSelect {
  const container = document.createElement("div");
  container.setAttribute("target", `#${target.id}`);
  if (options.selectClass.length > 0)
    container.classList.add(...options.selectClass.split(" "));
  container.classList.add("js-select_container", "open");
  if (options.openListOnHover) container.classList.add("hover");
  container.setAttribute("multi", options.multiple ? "1" : "0");
  container.setAttribute("value", "");
  container.setAttribute("tabindex", "0");
  const select = document.createElement("div");
  select.classList.add("js-select");
  const value = document.createElement("div");
  value.classList.add("js-select_value", "empty");
  value.setAttribute(
    "data-placeholder",
    options.multiple
      ? config.language.placeholderM
      : config.language.placeholderS
  );
  select.append(value);
  const clear = document.createElement("div");
  clear.classList.add("js-select_clear");
  const dropdown = document.createElement("div");
  dropdown.classList.add("js-select_dropdown", "loading");
  const search_container = document.createElement("div");
  search_container.classList.add("js-select_search_container");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.id = `js-search_${target.id}`;
  input.name = `js-search_${target.id}`;
  input.placeholder = config.language.searchPlaceholder;
  input.autocomplete = "off";
  if (options.inputClass.length > 0)
    input.classList.add(...options.inputClass.split(" "));
  input.classList.add("js-select_search");
  const label = document.createElement("label");
  label.innerText = "Search";
  label.htmlFor = input.id;
  search_container.append(input, label);
  const options_container = document.createElement("div");
  if (options.optionsContainerClass.length > 0)
    options_container.classList.add(
      ...options.optionsContainerClass.split(" ")
    );
  options_container.classList.add("js-select_options_container");
  options_container.setAttribute("current_focus", "-1");
  return {
    container: container,
    select: select,
    value: value,
    clear: clear,
    dropdown: dropdown,
    search_container: search_container,
    input: input,
    label: label,
    options_container: options_container,
  };
}

/**
 * Sets the events related to the JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options The JSSelect options.
 * @returns {CustomSelect} Returns the JSSelect object.
 */
function customSelectEvents(
  target: HTMLSelectElement,
  custom: CustomSelect,
  config: Configuration,
  options: Options
): CustomSelect {
  /** Close the JSSelect dropdown on blur */
  document.addEventListener("click", function (e) {
    const target = e.target as HTMLElement;
    if (
      target.className.indexOf("js-select") < 0 &&
      custom.container.classList.contains("close")
    ) {
      custom.container.classList.add("open");
      custom.container.classList.remove("close");
      custom.input.value = "";
      custom.input.dispatchEvent(new Event("input"));
      custom.input.focus();
      custom.options_container.setAttribute("current_focus", "-1");
    }
  });
  /** Open the JSSelect dropdown by pressing the "Enter" key when it has the focus */
  custom.container.onkeydown = (e) => {
    if (custom.container.classList.contains("open")) {
      e.preventDefault();
      if (e.key == "Enter") {
        e.preventDefault();
        custom.select.click();
      }
    }
  };
  /** Open or close the JSSelect dropdown when click it */
  custom.select.onclick = function (e) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("js-select_pill_remove")) return;
    if (target.classList.contains("js-select_pill")) return;
    custom.container.classList.toggle("open");
    custom.container.classList.toggle("close");
    if (custom.container.classList.contains("close")) {
      custom.input.value = "";
      custom.input.dispatchEvent(new Event("input"));
      custom.input.focus();
      custom.options_container.setAttribute("current_focus", "-1");
    }
  };
  /** Clear the selected option */
  custom.clear.onclick = function () {
    custom.value.textContent = "";
    custom.value.classList.add("empty");
    custom.container.setAttribute("value", "");
    custom.clear.style.display = "none";
    const previous =
      target.querySelector<HTMLOptionElement>(`option[selected]`);
    if (previous) previous.removeAttribute("selected");
    target.value = "";
    target.selectedIndex = -1;
    if (options.ClearedCallback)
      options.ClearedCallback(custom, target, options);
  };
  /** Let move between the option of the JSSelect with keyboard keys */
  custom.dropdown.onkeydown = function (e) {
    keyboardEvents(e, custom, config.optionList);
  };
  /** Filter the options */
  custom.input.onkeydown = function (e) {
    if (e.key == "Enter") e.preventDefault();
  };
  custom.input.onkeyup = function (e) {
    if (custom.input.value.trim().length == 0) {
      custom.options_container.append(
        fillOptions(target, custom, config.optionList, config, options)
      );
      return;
    }
    custom.options_container.innerHTML = "";
    custom.dropdown.classList.add("loading");
    const list = search(custom.input.value, config.optionList, options);
    list.then((l) => {
      if (l.options > 0) {
        custom.options_container.append(
          fillOptions(target, custom, l, config, options)
        );
      } else {
        custom.options_container.classList.add("no-results");
        custom.options_container.innerHTML = config.language.noResults.replace(
          "{search}",
          `"${custom.input.value}"`
        );
        custom.options_container.setAttribute("current_focus", "-1");
      }
      if (options.searchCallback)
        options.searchCallback(custom.input.value, l, custom, target, options);
      custom.dropdown.classList.remove("loading");
    });
  };
  return {
    container: custom.container,
    select: custom.select,
    value: custom.value,
    clear: custom.clear,
    dropdown: custom.dropdown,
    search_container: custom.search_container,
    input: custom.input,
    label: custom.label,
    options_container: custom.options_container,
  };
}

/**
 * Create the options group and options for the JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {CustomOptionsList} list The list of JSSelect options and options group.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options The JSSelect options.
 * @returns {DocumentFragment} Returns a documentFragment with the list of JSSelect options.
 */
export function fillOptions(
  target: HTMLSelectElement,
  custom: CustomSelect,
  list: CustomOptionsList,
  config: Configuration,
  options: Options
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let n = 0;
  list.option_list.forEach((item) => {
    const opt = item as OPTGroupList;
    const o = item as OptionList;
    if (opt.title && opt.options) {
      const group = document.createElement("div");
      group.classList.add("js-select_options_group");
      const title = document.createElement("div");
      if (options.optionsGroupClass.length > 0)
        title.classList.add(options.optionsGroupClass);
      title.classList.add("js-select_group_tittle");
      title.innerHTML = opt.title.trim() || config.language.noGroup;
      if (options.groupAddedCallback)
        options.groupAddedCallback(group, title, opt, custom, target, options);
      group.append(title);
      opt.options.forEach((op) => {
        const option = document.createElement("div");
        if (options.optionsClass.length > 0)
          option.classList.add(options.optionsClass);
        option.classList.add("js-select_option");
        option.setAttribute("value", op.value);
        option.setAttribute("index", n.toString());
        option.innerHTML = op.text;
        option.onclick = () =>
          optionClick(target, custom, option, op, config, options);
        if (options.optionAddedCallback)
          options.optionAddedCallback(option, op, custom, target, options);
        group.append(option);
        n++;
      });
      fragment.append(group);
    } else if (o.value && o.text) {
      const option = document.createElement("div");
      option.classList.add("js-select_option");
      if (options.optionsClass.length > 0)
        option.classList.add(options.optionsClass);
      option.setAttribute("value", o.value);
      option.setAttribute("index", n.toString());
      option.innerHTML = o.text;
      option.onclick = () =>
        optionClick(target, custom, option, o, config, options);
      if (options.optionAddedCallback)
        options.optionAddedCallback(option, o, custom, target, options);
      fragment.append(option);
      n++;
    }
  });
  if (fragment.childNodes.length == 0) {
    custom.options_container.classList.add("no-results");
    custom.options_container.innerHTML = options.fetch?.input
      ? config.language.fetch
      : config.language.empty;
    custom.options_container.setAttribute("current_focus", "-1");
  }
  return fragment;
}

/**
 * Select a single option in a JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {OptionList} op The list of JSSelect options.
 */
function singleValue(
  target: HTMLSelectElement,
  custom: CustomSelect,
  op: OptionList
): void {
  custom.value.textContent = op.text;
  custom.container.setAttribute("value", op.value);
  custom.clear.style.display = "block";
  const previous = target.querySelector<HTMLOptionElement>(`option[selected]`);
  if (previous) previous.removeAttribute("selected");
  custom.container.classList.remove("close");
  custom.container.classList.add("open");
}

/**
 * Select an option in a multi JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {HTMLDivElement} option The selected option element of the JSSelect.
 * @param {OptionList} op The list of JSSelect options.
 * @param {Options} options The JSSelect options.
 */
function multipleValue(
  target: HTMLSelectElement,
  custom: CustomSelect,
  option: HTMLDivElement,
  op: OptionList,
  options: Options
): void {
  if (option.hasAttribute("selected")) {
    const remove = custom.value.querySelector(
      `.js-select_pill[value="${option.innerHTML}"] .js-select_pill_remove`
    ) as HTMLDivElement;
    remove.click();
    return;
  }
  const current = custom.container.getAttribute("value");
  let values: string[] = [];
  if (current && current.length > 0) values = Array.from(JSON.parse(current));
  values.push(op.value);
  custom.container.setAttribute("value", JSON.stringify(values));
  option.setAttribute("selected", "selected");
  const pill = document.createElement("div");
  pill.setAttribute("value", op.value);
  pill.innerHTML = op.text;
  pill.classList.add("js-select_pill");
  const remove = document.createElement("div");
  remove.classList.add("js-select_pill_remove");
  remove.onclick = function (e) {
    const target_pill = (e.target as HTMLDivElement)
      .parentElement as HTMLDivElement;
    clearValueMulti(target, custom, target_pill, option, options);
  };
  pill.appendChild(remove);
  custom.value.append(pill);
}

/**
 * Clears the selected option in a multi JSSelect.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {HTMLDivElement} pill The selected option element of the JSSelect.
 * @param {HTMLDivElement} option The option element of the JSSelect.
 * @param {Options} options The JSSelect options.
 */
function clearValueMulti(
  target: HTMLSelectElement,
  custom: CustomSelect,
  pill: HTMLDivElement,
  option: HTMLDivElement,
  options: Options
): void {
  const list = custom.container.getAttribute("value");
  let values: string[] = [];
  if (list) {
    values = Array.from(JSON.parse(list));
    const n = values.indexOf(pill.textContent + "");
    values.splice(n, 1);
    custom.container.setAttribute("value", JSON.stringify(values));
    pill.remove();
  }
  const previous = target.querySelector<HTMLOptionElement>(`option[selected]`);
  if (previous) {
    previous.selected = false;
    previous.removeAttribute("selected");
  }
  option.removeAttribute("selected");
  if (values.length == 0) {
    custom.value.classList.add("empty");
    custom.container.setAttribute("value", "");
    target.selectedIndex = -1;
    target.value = "";
  }
  if (options.optionClearedCallback)
    options.optionClearedCallback(option, custom, target, options);
}

/**
 * The function triggered when click in an option of the list of JSSelect options.
 * @param {HTMLSelectElement} target The target select element.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {HTMLDivElement} option The selected option element of the JSSelect.
 * @param {OptionList} op The list of JSSelect options.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options The JSSelect options.
 */
function optionClick(
  target: HTMLSelectElement,
  custom: CustomSelect,
  option: HTMLDivElement,
  op: OptionList,
  config: Configuration,
  options: Options
): void {
  custom.value.classList.remove("empty");
  if (!options.multiple) singleValue(target, custom, op);
  else multipleValue(target, custom, option, op, options);
  const toSelect = target.querySelector<HTMLOptionElement>(
    `option[value="${op.value}"]`
  );
  if (toSelect) {
    toSelect.selected = true;
    toSelect.setAttribute("selected", "selected");
  } else if (!toSelect || target.options.length == 0) {
    const newOpt = document.createElement("option");
    newOpt.setAttribute("value", op.value);
    newOpt.setAttribute("selected", "selected");
    newOpt.innerHTML = op.text;
    target.options.add(newOpt);
  } else {
    console.error(
      `JSSelect: Failed to select the option, the selected option is not exist in the target select "${target.id}".`
    );
    if (!options.multiple) custom.clear.click();
  }
  triggerChangeEvents(custom, op, config);
}

/**
 * The function triggered to move between the options of the JSSelect with keyboard keys.
 * @param {KeyboardEvent} e The keyboard event.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {CustomOptionsList} list The list of JSSelect options and options group.
 */
function keyboardEvents(
  e: KeyboardEvent,
  custom: CustomSelect,
  list: CustomOptionsList
): void {
  let currentFocus = Number.parseInt(
    custom.options_container.getAttribute("current_focus") ?? "-1",
    10
  );
  if (e.key == "Escape") {
    e.preventDefault();
    custom.container.classList.remove("close");
    custom.container.classList.add("open");
  }
  const option =
    custom.options_container.querySelectorAll<HTMLDivElement>(
      `.js-select_option`
    );
  if (option.length > 0) {
    if (e.key == "ArrowUp") {
      e.preventDefault();
      currentFocus--;
      addActive(currentFocus, custom, list);
      simulateScroll(currentFocus, custom, list);
    }
    if (e.key == "ArrowDown") {
      e.preventDefault();
      currentFocus++;
      addActive(currentFocus, custom, list);
      if (currentFocus < 3) return;
      simulateScroll(currentFocus, custom, list);
    }
    if (e.key == "Enter") {
      e.preventDefault();
      custom.options_container
        .querySelector<HTMLDivElement>(`.js-select_option.active`)
        ?.click();
    }
  }
}

/**
 * Adds the active class to the selected option of the JSSelect.
 * @param {number} currentFocus The current option focus index.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {CustomOptionsList} list The list of JSSelect options and options group.
 */
function addActive(
  currentFocus: number,
  custom: CustomSelect,
  list: CustomOptionsList
): void {
  const selected = custom.options_container.querySelector<HTMLDivElement>(
    `.js-select_option.active`
  );
  if (selected) selected.classList.remove("active");
  if (currentFocus >= list.options) currentFocus = 0;
  if (currentFocus < 0) currentFocus = list.options - 1;
  const active = custom.options_container.querySelector<HTMLDivElement>(
    `.js-select_option[index="${currentFocus}"]`
  );
  if (active) active.classList.add("active");
  custom.options_container.setAttribute("current_focus", `${currentFocus}`);
}

/**
 * Simulates the scroll movement when use the keyboard to move between the options of the JSSelect.
 * @param {number} currentFocus The current option focus index.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {CustomOptionsList} list The list of JSSelect options and options group.
 */
function simulateScroll(
  currentFocus: number,
  custom: CustomSelect,
  list: CustomOptionsList
): void {
  if (currentFocus >= list.options) currentFocus = 0;
  if (currentFocus < 0) currentFocus = list.options - 1;
  const option = custom.options_container.querySelector(
    `.js-select_option[index="${currentFocus}"]`
  ) as HTMLDivElement;
  custom.options_container.scrollTop = option.offsetHeight * currentFocus;
}

/**
 * Triggers the events of the JSSelect.
 * @param {CustomSelect} custom The JSSelect object.
 * @param {OptionList} op The list of JSSelect options.
 * @param {Configuration} config The JSSelect configuration.
 */
function triggerChangeEvents(
  custom: CustomSelect,
  op: OptionList,
  config: Configuration
): void {
  const change = config.onchange;
  if (change.length > 0) {
    change.forEach((e) => {
      e(custom, op);
    });
  }
}

/**
 * Sets the list of JSSelect options obtained form a source.
 * @param {HTMLSelectElement} target The target select element
 * @param {CustomSelect} custom The JSSelect object.
 * @param {Configuration} config The JSSelect configuration.
 * @param {Options} options The JSSelect options.
 */
export function setOptions(
  target: HTMLSelectElement,
  custom: CustomSelect,
  config: Configuration,
  options: Options
): void {
  const ol = getOptionList(target, options);
  ol.then((value) => {
    if (isCustomOptionsList(value)) config.optionList = value;
    const opts = fillOptions(
      target,
      custom,
      config.optionList,
      config,
      options
    );
    custom.dropdown.removeAttribute("data-loading");
    custom.dropdown.classList.remove("loading");
    custom.options_container.append(opts);
  });
}
