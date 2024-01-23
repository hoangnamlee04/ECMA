import Navigo from "navigo"; // When using ES modules.

const router = new Navigo("/", { linksSelector: "a" });
function printf(container, components) {
  document.querySelector(container).innerHTML = components;
  
}
const Formatter = new Intl.NumberFormat();
export { router, printf, Formatter };