const Header = function () {
  // Backticks - string interpolation
  return `
  <header class="bg-blue-500">
  <div class="max-w-screen-xl mx-auto flex justify-between">
  <a href="/">
    <img
      src="/logo.png"
      alt=""
      class="pt-4 pb-[21px] grow-0 mr-[123px] max-w-[80px]"
    /></a>
    <div class="header__feature flex items-center grow mt-4 mb-11">
      <!-- start search -->
      <div class="search-wapper flex grow mr-4">
        <input type="text" class="outline-none grow text-gray-900 pl-2" />
        <button
          type="submit"
          class="px-[18px] py-[10px] bg-btn rounded-r-sm"
        >
          <div class="flex items-center text-sm">
            <i class="fa-solid fa-magnifying-glass pr-2 text-sm"></i>
            Tìm kiếm
          </div>
        </button>
      </div>
      <!-- end search -->
      <!-- start user -->
      <div class="user-wapper flex items-center">
        <i class="fa-regular fa-user text-2xl mr-2"></i>
        <div class="user-status text-xs">
          <div class="user-text">
            <span>Đăng Nhập</span> /
            <span>Đăng Ký</span>
          </div>
          <div class="user-account">
            Tài khoản<i class="fa-solid fa-sort-down pl-1"></i>
          </div>
        </div>
      </div>
      <!-- end user -->
      <!-- start shopping -->
      <div class="shopping-wapper flex ml-8">
        <div class="relative">
          <i class="fa-solid fa-cart-shopping text-2xl"></i>
          <span
            class="w-5 h-5 rounded-full bg-yellow-400 text-center absolute -right-2 -top-1 leading-5 color-text"
            >0</span
          >
        </div>
        <p class="text-xs pt-4 pl-2">Giỏ hàng</p>
      </div>
      <!-- end shopping -->
    </div>
  </div>
</header>
    `
}

export default Header