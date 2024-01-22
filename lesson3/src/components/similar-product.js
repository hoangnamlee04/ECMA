import { Formatter } from "../ultilities";
const SimilarProduct = {
  render: (books, id) => {
    let bookSimilar = books.filter((item) => {
      return item.categories.id == books[id].categories.id;
    });
    let html = "";
    bookSimilar.forEach((book) => {
      html += `<li><div
      class="item-product px-5 pt-[13px] pb-[26px] h-[317px] flex flex-col justify-between"
    >
      <img
        src="${book.images[0].small_url}"
        alt=""
        class="max-w-[180px] max-h-[180px]"
      />
      <div class="info-product">
        <h3 class="color-text text-[13px]">
          ${book.name}
        </h3>
        <div class="reviews flex items-center my-[6px]">
          <div class="starts text-[10px]">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <span class="w-[1px] h-[10px] bg-slate-300 m-[4px]"></span>
          <div class="sold text-[10px] text-[#787878]">
            Đã bán 1000+
          </div>
        </div>
        <div class="price color-price flex items-center">
          <span>${Formatter.format(book.list_price)}</span> ₫
          <div
            class="sale ml-[5px] px-[3px] leading-4 border-[1px] border-[#FF424E] rounded-sm max-h-[16px] bg-[#FFF0F1]"
          >
            -23%
          </div>
        </div>
        <div class="slogan color-price flex relative mt-1">
          <i class="fa-solid fa-shield" style="font-size: 18px"></i>
          <span class="text-white absolute -top-1 left-1">$</span>
          <p class="uppercase text-xs pl-1">Rẻ hơn khi hoàn tiền</p>
        </div>
      </div>
    </div>
    </li>`;
    });
    return `
      <div class="similar-product relative ">
      <h3 class="ml-[6px] mb-[13px] text-xl">Sản Phẩm Tương Tự</h3>
      <div class="similar-list overflow-hidden">
      <ul class="flex carousel h-[355px]">
      ${html}
      </ul>
      </div>
      <div
        class="btn-similar flex justify-between min-w-full absolute top-2/4"
      >
        <div class="prev ml-4">
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div class="next mr-4">
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>`;
  },
  afterRender: () => {
    let currentCarousel = 0;
    let widthItemCarousel = 213;
    let btnNext = document.querySelector(".btn-similar .next");
    let btnPrev = document.querySelector(".btn-similar .prev");
    const carousel = document.querySelector(".similar-list .carousel");
    const itemCarousel = document.querySelectorAll(
      ".similar-list .carousel li"
    );
    let maxItem = itemCarousel.length - 6;
    console.log(itemCarousel.length);
    btnNext.style.display = itemCarousel.length <= 6 ? "none" : "inline-block";
    btnPrev.style.display = currentCarousel == 0 ? "none" : "inline-block";
    btnNext.addEventListener("click", (e) => {
      currentCarousel++;
      let width = currentCarousel * widthItemCarousel + "px";
      carousel.style.transform = `translate(-${width},0)`;
      btnPrev.style.display = currentCarousel == 0 ? "none" : "inline-block";
      btnNext.style.display = currentCarousel == 3 ? "none" : "inline-block";
    });
    btnPrev.addEventListener("click", (e) => {
      currentCarousel--;
      let width = currentCarousel * widthItemCarousel + "px";
      carousel.style.transform = `translate(-${width},0)`;
      btnNext.style.display = currentCarousel == 3 ? "none" : "inline-block";
      btnPrev.style.display = currentCarousel == 0 ? "none" : "inline-block";
    });
  },
};
export default SimilarProduct;