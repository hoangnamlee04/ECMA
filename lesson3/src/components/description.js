import { useEffect, useState, loading } from "../ultilities";
import { isEmpty } from "lodash";
const DescriptionProduct = {
  render: (id) => {
    const [book, setBook] = useState([]);
    useEffect(async () => {
      const response = await fetch(`http://localhost:3000/books/?id=${id}`);
      const data = await response.json();
      setBook(data[0]);
    }, []);
    if (isEmpty(book)) {
      return loading();
    }
    return `
    <div class="description mt-11">
    <h3 class="text-xl mb-3">Mô Tả Sản Phẩm</h3>
    <div class="text-sm list-desc">
      ${book?.description || ""}
    </div>
    <div class="see-more max-w-max  mx-auto mt-2">
      <button
        class="text-[13px] text-[#189EFF] border-2 border-[#189EFF] rounded py-1 px-14 mb-[84px]"
      >
        Xem Thêm Nội Dung
      </button>
    </div>
  </div>`;
  },
};
export default DescriptionProduct;
