const data = new FormData();
data.append("j", "123");
const select = JSSelect(
  "a",
  {
    multiple: false,
    fetch: {
      input: "data.json",
    },
    fromCountries: {
      countries: world_es,
      options: {
        group: "Continent",
        text: (c) => {
          const onu =
            c.ONU == "SI" ? 'style="color: skyblue;"' : 'style="color: red;"';
          return `<span ${onu}>${c.Flag} ${c.CTname} [${c["3166-1a2"]}]</span>`;
        },
      },
    },
  },
  es_ec
);
select.init();
// select.setStyles("is-valid");
document.getElementById("a").style.display = "block";
const d = document.getElementById("d");
const d2 = document.getElementById("d2");
const dm = document.getElementById("dm");
d.addEventListener("change", () => {
  if (d.checked) dm?.setAttribute("data-bs-theme", "dark");
  else dm?.setAttribute("data-bs-theme", "light");
});
d2.addEventListener("change", () => {
  if (d2.checked) select.darkMode();
  else select.lightMode();
});

d.checked = true;
d2.checked = true;
d.dispatchEvent(new Event("change"));
d2.dispatchEvent(new Event("change"));
