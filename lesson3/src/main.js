import { printf, router } from "./ultilities";
// import "toastify-js/src/toastify.css";
import HomePage from "./pages/homePages";
import DetailProductPage from "./pages/detailProduct";
import Dashboard from "./pages/dashboard";
import newBookPage from "./pages/newBookPages";
import UpdateBookPages from "./pages/updateBookPage";
router.on({
  "/": () => printf("#app", () => HomePage.render()),
  "/book/detail/:categories/:id": ({ data }) =>
    printf("#app", () => DetailProductPage.render(data.categories, data.id)),
  "/admin": () => printf("#app", () => Dashboard()),
  "/admin/new-book": () => printf("#app", newBookPage),
  "/admin/update-book/:id": ({ data }) =>
    printf("#app", () => UpdateBookPages(data.id)),
});
router.resolve();