import { printf, router } from "./ultilities";
import { books } from "../db.json" assert {type:'json'};
import HomePage from "./pages/homePages";
import DetailProductPage from "./pages/detailProduct";
import Products from "./components/products";
router.on({
  "/": () => printf('#app',HomePage.render(books),HomePage),
  "/book/detail/:id": (data) =>printf('#app',DetailProductPage.render(books,data.data.id),DetailProductPage),
});
router.resolve();
    // Search
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelector.bind(document);
    let inputSearch = $('.search-wapper input');
    let btnSearch = $('.search-wapper button');
    let formSearch = $('#formSearch');
    formSearch.addEventListener('submit',(e) =>{
      e.preventDefault();
      let keyWord = inputSearch.value;
       let booksSearch = books.filter((book)=>{
        return book.name.toLowerCase().includes(keyWord.toLowerCase());
      })
      if ($('#products')) {
        printf('#products',Products.render(booksSearch))
      } else {
        printf('#app',HomePage.render(booksSearch),HomePage)
      }
      
    });