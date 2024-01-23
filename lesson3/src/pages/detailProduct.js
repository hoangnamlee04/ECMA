import Header from "../components/header";
import ProductDetail from "../components/product-detail";
import SimilarProduct from "../components/similar-product";
import DescriptionProduct from "../components/description";
import Footer from "../components/footer";
const DetailProductPage = {
  render: (books, id) => {
    return `
    ${Header()}
    <main class="mt-10 bg-white color-text">
    <div class="max-w-screen-xl mx-auto">
  ${ProductDetail.render(books, id)}
  ${SimilarProduct.render(books, id)}
  ${DescriptionProduct.render()}
      </div></main>
      ${Footer()}`;
  }
};
export default DetailProductPage;