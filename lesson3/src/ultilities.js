import Navigo from "navigo"; // When using ES modules.

const router = new Navigo("/", { linksSelector: "a" });
function printf(container, components, object) {
  document.querySelector(container).innerHTML = components;
  if (object.afterRender) {
    object.afterRender();
  }
}
const Formatter = new Intl.NumberFormat();
export { router, printf, Formatter };