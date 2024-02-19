import {
    useEffect,
    useState,
    loading,
    parseLinkHeaders,
    debounce,
    // Toastify,
  } from "../../ultilities";
  import { isEmpty } from "lodash";
  import { Formatter } from "../../ultilities";
  const ContentAdmin = () => {
    const [books, setBooks] = useState([]);
    const [htmlPages, setHtmlPages] = useState("");
    const [infoPage, setInfoPage] = useState({ currentPage: 1 });
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    useEffect(async () => {
      const response = await fetch(
        `http://localhost:3000/books?_page=${infoPage.currentPage}&_limit=10`
      );
      const data = await response.json();
      const headerLink = parseLinkHeaders(response.headers.get("Link"));
      setInfoPage((prev) => ({ ...prev, ...headerLink }));
      setHtmlPages(renderPages(headerLink));
      setBooks(data);
      const dataBooks = await (await fetch(`http://localhost:3000/books`)).json();
      let filterCategoriesBook = [
        ...new Set(dataBooks.map((book) => book?.categories?.name)),
      ];
      let filterAuthorsBook = [
        ...new Set(dataBooks.map((book) => book?.authors?.[0]?.name)),
      ];
      setCategories(filterCategoriesBook);
      setAuthors(filterAuthorsBook);
    }, []);
  
    useEffect(() => {
      const $ = document.querySelector.bind(document);
      const $$ = document.querySelectorAll.bind(document);
      const paginations = $(".pagination-admin");
      if (paginations) {
        handlePageAnimation();
        paginations.onclick = (e) => {
          let isNumberPage = e.target
            .closest("li")
            .classList.contains("numberPnt");
          if (isNumberPage) {
            handlePages(e);
          } else {
            handlePagePrevOrNext(e);
          }
        };
      }
  
      const inputSearchAdmin = $("#inputSearchAdmin");
      if (inputSearchAdmin) {
        inputSearchAdmin.addEventListener(
          "input",
          debounce(handleSearchBooks, 700)
        );
      }
      const btnDeleteBooks = $$(".btn-delete-book ");
      if (btnDeleteBooks) {
        btnDeleteBooks.forEach((btnDelete) => {
          btnDelete.onclick = (e) => {
            let id = btnDelete.dataset.book;
            if (confirm("Bạn chắc chắn xoá chứ")) {
              btnDelete.closest("tr").remove();
              handleDeleteBook(id);
              Toastify({
                close: true,
                text: "Xoá thành công",
                style: {
                  background: "#47d864",
                },
              }).showToast();
            }
          };
        });
      }
      const eventDelegationSubmenus = $$(".submenu");
      if (eventDelegationSubmenus) {
        for (const menu of eventDelegationSubmenus) {
          menu.onclick = (e) => handleSubmenu(e);
        }
      }
    });
    // function xử lý khi click vào số trang (start)
    const handlePages = (e) => {
      fetch(
        `http://localhost:3000/books?_page=${e.target.innerText}&_per_page=10`
      )
        .then((response) => {
          setInfoPage(() => ({
            ...parseLinkHeaders(response.headers.get("Link")),
            currentPage: +e.target.innerText,
          }));
          return response.json();
        })
        .then((results) => {
          setBooks(results);
        });
    };
    // end
    // function xử lý khi click vào btn Prev, Next (start)
    const handlePagePrevOrNext = (e) => {
      let btnPrevOrNext = e.target.closest("li").className;
      let tmp =
        btnPrevOrNext == "btn-page-next"
          ? ++infoPage.currentPage
          : --infoPage.currentPage;
      fetch(`http://localhost:3000/books?_page=${tmp}&_per_page=10`)
        .then((response) => {
          setInfoPage(() => ({
            ...parseLinkHeaders(response.headers.get("Link")),
            currentPage: tmp,
          }));
          return response.json();
        })
        .then((results) => {
          setBooks(results);
        });
    };
    // Animation pages
    const handlePageAnimation = () => {
      const $ = document.querySelector.bind(document);
      const $$ = document.querySelectorAll.bind(document);
      $(".pagination-admin li.active").classList.remove("active");
      $(
        `.pagination-admin li:nth-child(${infoPage.currentPage + 1})`
      ).classList.add("active");
      infoPage.prev > 0 ? $(".btn-page-prev").classList.remove("hidden") : "";
      infoPage.currentPage == infoPage.last
        ? $(".btn-page-next").classList.add("hidden")
        : "";
    };
    // Search books
    const handleSearchBooks = (e) => {
      const keyWord = e.target.value;
      fetch(`http://localhost:3000/books?q=${keyWord}`)
        .then((response) => response.json())
        .then((data) => {
          isEmpty(data)
            ? Toastify({
                close: true,
                text: "Không có kết quả nào phù hợp",
                style: {
                  background: "#ffc021",
                },
              }).showToast()
            : setBooks(data);
        });
    };
    // Xoá books
    const handleDeleteBook = (id) => {
      fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    };
    // Filter submenu
    const handleSubmenu = async (e) => {
      const contentFilter = e.target.closest("li").innerText;
      const active = e.target.closest("ul").id;
      const link = `http://localhost:3000/books?${
        active == "authors" ? active + "[0]" : active
      }.name_like=${contentFilter}`;
      console.log(link);
      const data = await (await fetch(link)).json();
      setBooks(data);
    };
    // Render giao diện Pages
    const renderPages = (headerLink) => {
      let html = `<li class="active numberPnt block h-8 w-8 rounded text-center leading-8 border border-gray-200 bg-white  text-gray-900">
      1
    </li>`;
      for (let i = 1; i < headerLink.last; i++) {
        html += `<li class="numberPnt block h-8 w-8 rounded text-center leading-8 border border-gray-200 bg-white  text-gray-900">
       ${i + 1}
     </li>`;
      }
      return html;
    };
    // Animation Loading
    if (isEmpty(books) || htmlPages == "") {
      return loading();
    }
    // Animation Loading end
    return /*html */ `
    <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div class="capitalize">
          <nav aria-label="breadcrumb" class="w-max">
            <ol class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <a href="#">
                  <p class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                </a>
                <span class="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
              </li>
              <li class="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
              </li>
            </ol>
          </nav>
        </div>
        <div class="flex items-center">
          <div class="mr-auto md:mr-4 md:w-56">
            <div class="relative w-full min-w-[200px] h-10">
              <input id="inputSearchAdmin" class="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-1 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder="">
              <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal text-transparent peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Tìm kiếm</label>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="mt-6">
  <div class="rounded-lg border border-gray-200">
  <div class="max-w-full rounded-t-lg">
  <div class="w-full ">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
      <div class="rounded-t-lg mb-0 px-4 py-3">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-gray-700">List Book</h3>
          </div>
          <div class="relative  px-4  flex-grow text-right group max-w-max">
          <div class="cursor-pointer">
            <i class="fa-solid fa-filter text-gray-800"></i>
            <span class=" text-gray-800">Lọc </span>
          </div>
          <div class=" absolute top-6 right-4 text-gray-800 text-sm shadow-lg bg-gray-200 min-w-max rounded z-50 hidden group-hover:block">
          <ul class="text-center py-1 cursor-pointer">
            <li class="px-3 py-1 hover:bg-white categories relative ">Danh mục
            <ul class="submenu hidden absolute top-0 right-[118px] shadow-2xl bg-[#acacac] min-w-max rounded py-2" id="categories">
            ${categories
              .map(
                (categorie) =>
                  `<li class=" px-3 py-1 hover:bg-white">${categorie}</li>`
              )
              .join("")}
            </ul>
            </li>
            <li class="px-3 py-1 hover:bg-white authors  relative">Nhà xuất bản
            <ul class="submenu hidden absolute top-0 right-[118px] shadow-2xl bg-[#acacac] min-w-max rounded py-2 " id="authors">
            ${authors
              .map((author) => {
                if (author) {
                  return `<li class="px-3 py-1 hover:bg-white">${author}</li>`;
                }
              })
              .join("")}
            </ul>
          </ul>
            </li>
          </ul>
          </div>
                </div>
        </div>
      </div>
  
      <div class="block w-full overflow-x-auto">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
      <thead class="ltr:text-left rtl:text-right  min-w-full bg-gray-100">
        <tr>
          <th class=" px-4 py-2 font-medium text-gray-900 max-w-[20%]">Tên</th>
          <th class=" px-4 py-2 font-medium text-gray-900 max-w-[10%]">Giá</th>
          <th class=" px-4 py-2 font-medium text-gray-900 max-w-[40%]">Mô tả</th>
          <th class=" px-4 py-2 font-medium text-gray-900 max-w-[30%]">Actions</th>
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200 min-w-full">
      ${books
        .map((book) => {
          return `
        <tr>
          <td class=" px-4 py-2 font-medium text-gray-900 text-start text-ellipsis">${
            book.name
          }</td>
          <td class=" px-4 py-2   text-red-600">${Formatter.format(
            book.list_price
          )}đ</td>
          <td class="px-4 py-2 text-gray-700 truncate max-w-[800px] ">${
            book.short_description
          }</td>
          <td class=" px-2 py-1 text-gray-700 btn-Admin">
          <div class="flex item-center justify-center">
                                          <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                          <a href="/admin/update-book/${book.id}">
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                              </svg>
                                              </a>
                                          </div>
                                          <div  class=" btn-delete-book w-4 mr-2 transform hover:text-purple-500 hover:scale-110  " data-book="${
                                            book.id
                                          }">
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                              </svg>
                                          </div>
                                      </div>
          </td>
        </tr>
        `;
        })
        .join("")}
        
      </tbody>
    </table>
      </div>
    </div>
  </div>
  
  </div>
  
      </div>
      <ol class="flex justify-end gap-1 text-xs font-medium mt-3 pagination-admin">
    <li class="${infoPage?.currentPage == 1 ? "hidden" : ""} btn-page-prev">
      <div
       
        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 rtl:rotate-180"
      >
        <span class="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </li>
    
        ${htmlPages}
    <li class="btn-page-next">
      <div
        class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-900 rtl:rotate-180"
      >
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </li>
  </ol>
      `;
  };
  export default ContentAdmin;
  