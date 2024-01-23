const Tabs = {
    render: () => {
      return `
      <div
      class="tabs-option border-b-[1px] border-gray-200 border-solid relative"
    >
      <ul class="flex items-center">
        <li class="tab-items active"><a href="">Phổ Biến</a></li>
        <li class="tab-items"><a href="">Bán Chạy</a></li>
        <li class="tab-items"><a href="">Hàng Mới</a></li>
        <li class="tab-items"><a href="">Giá Thấp</a></li>
        <li class="tab-items"><a href="">Giá Cao</a></li>
      </ul>
      <span class="tab-line"></span>
    </div>
      `;
    }
  };
  export default Tabs;