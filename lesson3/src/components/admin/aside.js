import { useEffect, useState } from "../../ultilities";
import { router } from "../../ultilities";
const AsideAdmin = () => {
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    const handleAside = (e) => {
      e.preventDefault();
      const elementAside = e.target.closest(".aside-admin li");
      setActive(elementAside.id);
      router.navigate(elementAside.dataset.url);
    };
    const asideAdmin = document.querySelector(".aside-admin");
    asideAdmin.onclick = handleAside;
    asideAdmin.addEventListener("click", handleAside);
    return () => {
      document
        .querySelector(".aside-admin")
        .removeEventListener("click", handleAside);
    };
  });
  return /*html*/ `
  <aside class="shadow-2xl  shadow-gray-500 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
  <div class="relative border-b ">
    <a class="flex items-center gap-4 py-6 px-8" href="/admin">
      <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-zinc-800">Admin Books</h6>
    </a>
    <button class="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-zinc-800 hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
      <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 text-zinc-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </span>
    </button>
  </div>
  <div class="m-4">
    <ul class="mb-4 flex flex-col gap-1 aside-admin" >
      <li aria-current="page" class="${
        active == "dashboard" ? "active" : ""
      }" id="dashboard" data-url="/admin">
      
          <button class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg  text-zinc-800    w-full flex items-center gap-4 px-4 capitalize" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
            </svg>
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p>
          </button>
      </li>
      <li class="${
        active == "new-book" ? "active" : ""
      }" id="new-book" data-url="/admin/new-book">
          <button class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-zinc-800 hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
  <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clip-rule="evenodd" />
</svg>

      
            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">New book</p>
          </button>
      </li>
    </ul>
   
  </div>
</aside>
`;
};
export default AsideAdmin;