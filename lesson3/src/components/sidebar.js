const Sidebar = {
    render: () => {
      return `
      <!--start Sidebar -->
      <div class="sidebar  whitespace-nowrap">
        <h3 class="uppercase text-[13px] mb-[10px]">
          <a href="">Danh mục sản phẩm</a>
        </h3>
        <ul>
          <li><a href="/product/detail/12">English Books</a></li>
          <li><a href="">Sách tiếng Việt</a></li>
          <li><a href="">Văn phòng phẩm</a></li>
          <li><a href="">Quà lưu niệm</a></li>
        </ul>
      </div>
      <!--end Sidebar -->
      `;
    },
  };
  export default Sidebar;