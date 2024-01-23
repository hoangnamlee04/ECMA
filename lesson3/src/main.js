import { printf, router } from "./ultilities";
import { books } from "../db.json" assert {type:'json'};
import HomePage from "./pages/homePages";
import DetailProductPage from "./pages/detailProduct";
import Products from "./components/products";
router.on({
  "/": () => printf('#app',HomePage.render(books)),
  "/book/detail/:id": (data) =>printf('#app',DetailProductPage.render(books,data.data.id)),
});
router.resolve();
