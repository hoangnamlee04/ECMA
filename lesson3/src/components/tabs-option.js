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
    },
    afterRender: () => {
      const tabs = document.querySelectorAll(".tab-items a");
      const tabActive = document.querySelector(".tab-items.active a");
      const tabLine = document.querySelector(".tabs-option .tab-line");
      tabLine.style.left = tabActive.offsetLeft + "px";
      tabLine.style.width = tabActive.offsetWidth + "px";
      tabs.forEach((tab) => {
        tab.onclick = function (e) {
          document.querySelector(".tab-items.active").classList.remove("active");
          tabLine.style.left = this.offsetLeft + "px";
          tabLine.style.width = this.offsetWidth + "px";
          this.closest(".tab-items").classList.add("active");
        };
      });
    },
  };
  export default Tabs;