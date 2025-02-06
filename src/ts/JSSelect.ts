import type {
  Configuration,
  Options,
  Lang,
  CustomSelect,
  JSSelectEvent,
} from "./types";

import { configuration, language, options } from "./config";
import { customSelect, setOptions } from "./dom";

/**
 * JSSelect class definition.
 * @class Select.
 */
class Select {
  private readonly select: string;
  private readonly config: Configuration;
  private readonly options: Options;
  private readonly lang: Lang;
  private custom: CustomSelect | null;

  constructor(sel: string, opt?: Options, lang?: Lang) {
    this.select = sel;
    this.config = configuration;
    this.config.language = { ...language, ...lang };
    this.options = { ...options, ...opt };
    this.lang = this.config.language;
    this.custom = null;
  }

  /**
   * Checks if the element exists and is a select element.
   * @returns {boolean} True if the element exists and is a select element.
   */
  private check(): boolean {
    let element = document.getElementById(this.select);
    if (element) {
      if (element.nodeName !== "SELECT") {
        console.error(
          `JSSelect: Failed to initialize the library, "${this.select}" is not a HTMLSelectElement.`
        );
        return false;
      }
    } else {
      console.error(
        `JSSelect: Failed to initialize the library, the select "${this.select}" can not be found.`
      );
      return false;
    }
    return true;
  }

  /**
   * Set the events to the target select.
   * @param {HTMLSelectElement} select The target select.
   */
  private targetEvents(select: HTMLSelectElement) {
    select.addEventListener("change", () => {
      const selected = Array.from(select.selectedOptions);
      const options =
        select.querySelectorAll<HTMLOptionElement>("option[selected]");
      if (selected.length == 1) {
        Array.from(options).forEach((item) => {
          if (item != selected[0]) {
            const clear = this.custom?.value.querySelector<HTMLDivElement>(
              `.js-select_pill[value="${item.value}"] .js-select_pill_remove`
            );
            if (clear) clear.click();
          }
        });
      }
      const list = this.custom?.container.getAttribute("value");
      let opts: string[] = [];
      let values: string[] = [];
      if (list && list.length > 2) values = Array.from(JSON.parse(list));
      selected.forEach((item) => {
        if (!values.includes(item.value)) opts.push(item.value);
      });
      opts.forEach((v) => {
        const option = this.custom?.options_container.querySelector(
          `.js-select_option[value="${v}"]`
        ) as HTMLDivElement;
        option.click();
      });
    });
  }

  /**
   * Initialize the custom select.
   * @returns {(CustomSelect | null)} Returns null if initialization fails, otherwise a CustomSelect object.
   */
  init(): CustomSelect | null {
    if (!this.check()) return null;
    const target = document.getElementById(this.select) as HTMLSelectElement;
    this.options.multiple = this.options.multiple ?? target.multiple;
    target.style.display = "none";
    target.value = "";
    target.selectedIndex = -1;
    const custom = customSelect(target, this.config, this.options);
    setOptions(target, custom, this.config, this.options);
    custom.dropdown.append(custom.search_container, custom.options_container);
    const loading = document.createElement("div");
    loading.classList.add("js-select_loading");
    loading.setAttribute("data-loading", this.config.language.loading);
    custom.dropdown.append(loading);
    custom.container.append(custom.select, custom.clear, custom.dropdown);
    target.insertAdjacentElement("afterend", custom.container);
    this.custom = custom;
    this.setStyles();
    this.targetEvents(target);
    return this.custom;
  }

  /**
   * Sets additional styles to the custom select.
   * @param {?string} [classes] A white spaced list of CSS classes.
   */
  setStyles(classes?: string): void {
    if (!this.custom) return;
    if (classes && classes.length > 0)
      this.custom.container.classList.add(...classes.split(" "));
    this.custom.dropdown.style.marginTop = window.getComputedStyle(
      this.custom.container
    ).paddingBottom;
    this.custom.select.style.margin = `-${
      window.getComputedStyle(this.custom.container).paddingTop
    } -${window.getComputedStyle(this.custom.container).paddingRight} -${
      window.getComputedStyle(this.custom.container).paddingBottom
    } -${window.getComputedStyle(this.custom.container).paddingLeft}`;
    this.custom.clear.style.right = window.getComputedStyle(
      this.custom.select
    ).paddingRight;
  }

  /**
   * Sets the dark mode styles.
   */
  darkMode(): void {
    if (this.custom) this.custom.container.classList.add("dark");
  }

  /**
   * Sets the light mode styles.
   */
  lightMode(): void {
    if (this.custom) this.custom.container.classList.remove("dark");
  }

  /**
   * Return the selected option(s) value(s).
   * @returns {string} Returns a stringify array if it is a multiple select.
   */
  value(): string {
    if (this.custom)
      return this.custom.container.getAttribute("value") as string;
    else return "";
  }

  /**
   * Clear all the selected options.
   * @param {?number} [index] Index of the selected option.
   */
  clear(index?: number): void {
    if (this.custom)
      if (!this.options.multiple) this.custom.clear.click();
      else if (index) {
        const pill = this.custom.value.children.item(
          index
        ) as HTMLDivElement | null;
        if (pill) {
          const clear = pill.querySelector(
            ".js-select_pill_remove"
          ) as HTMLDivElement;
          clear.click();
        } else {
          console.error(
            `JSSelect: Failed to clear the option, the index "${index}" is invalid.`
          );
        }
      }
  }

  /** Select the option corresponding to the indicated index.
   * @param {number} index The index of the option to be selected.
   * @returns {(string|undefined)} The value of the selected option or undefined if not found.
   */
  optionSelect(index: number): string | undefined {
    if (index > 0 && index < this.config.optionList.options) {
      const option = this.custom?.dropdown.querySelector<HTMLDivElement>(
        `.js-select_option[index="${index}"]`
      );
      if (option) {
        option.click();
        return option.innerHTML;
      }
    }
    return undefined;
  }

  /**
   * Add an eventListener to the change event.
   * @param {string} event The event name.
   * @param {JSSelectEvent} fn The event function.
   */
  addEventListener(event: string, fn: JSSelectEvent): void {
    if (event == "change") {
      this.config.onchange.push(fn);
    } else {
      console.error(
        `JSSelect: Failed to add the eventListener, "${event}" is not a valid Event.`
      );
    }
  }
}

/**
 * Creates a custom select element linked to a target select element.
 * @param {string} select Select element id.
 * @param {?Options} [options] Select options.
 * @param {?Lang} [lang] Select language.
 * @returns {Select} Select instance.
 */
export function JSSelect(
  select: string,
  options?: Options,
  lang?: Lang
): Select {
  return new Select(select, options, lang);
}
