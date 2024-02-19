import { useState, useEffect, loading } from "../../ultilities";
import { isEmpty } from "lodash";
const UpdateBook = (id) => {
  const [book, setBook] = useState({});
  useEffect(async () => {
    let data = await (await fetch(`http://localhost:3000/books/${id}`)).json();
    setBook(data);
  }, []);
  useEffect(() => {
    const formNewBook = document.querySelector("#formNewBook");
    if (formNewBook) {
      formNewBook.onsubmit = (e) => {
        e.preventDefault();
        handleInput(id);
      };
    }
  });
  const handleInput = (id) => {
    const inputs = document.querySelectorAll("input");
    const desc = document.querySelector("#short_description");
    let data;
    data = desc.value != "" ? { [desc.id]: desc.value } : {};
    desc.classList.remove("error", "succes");
    desc.classList.add(`${desc.value == "" ? "error" : "success"}`);
    inputs.forEach((i) => {
      if (i.type != "checkbox") {
        let value = i.value;
        i.classList.remove("error", "succes");
        i.classList.add(`${value == "" ? "error" : "success"}`);
        data = {
          ...data,
          [i.id]: value,
        };
      } else {
        data = {
          ...data,
          [i.id]: i.checked ? 1 : 0,
        };
      }
    });
    let isValidate = Array.from(inputs).every(
      (item) => !item.classList.contains("error")
    );
    if (isValidate) {
      fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      Toastify({
        close: true,
        text: "Cập nhập thành công",
        style: {
          background: "#47d864",
        },
      }).showToast();
    }
  };
  if (isEmpty(book)) {
    return loading();
  }
  return /*html*/ `
    <nav class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
      <div class="capitalize">
        <nav aria-label="breadcrumb" class="w-max">
          <ol class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
            <li class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
              <a href="/admin">
                <p class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
              </a>
              <span class="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
            </li>
            <li class="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
              <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">update book</p>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </nav>
      <div class="mt-4 mx-auto">
      <form action="" id="formNewBook" >
      <div class="grid grid-cols-2 gap-x-8">
      <div class="mb-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
      Tên Sách
    </label>
    <input   class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" value="${
      book.name
    }">
    <p class="text-red-500 text-xs italic">Vui lòng nhập tên sách</p>
      </div>
    <div class="mb-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="original_price">
      Giá
    </label>
    <input class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="original_price" type="text" value="${
      book.original_price
    }">
    <p class="text-red-500 text-xs italic">Vui lòng nhập giá sách</p>
      </div>
    <div class="mb-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="short_description">
      Mô tả
    </label>
    <textarea name="" id="short_description" cols="30" rows="10" class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">${
      book.short_description
    }</textarea>
    <p class="text-red-500 text-xs italic">Vui lòng nhập tên sách</p>
      </div>
    <div class="mb-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="list_price">
      Giá niêm yết
    </label>
    <input class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="list_price" type="text" value="${
      book.list_price
    }">
    <p class="text-red-500 text-xs italic">Vui lòng nhập giá niêm yết sách</p>
      </div>
    <div class="mb-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sale_price">
      Giá khuyến mãi
    </label>
    <input class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="sale_price" type="text"  value="${
      book.sale_price || 0
    }">
    <p class="text-red-500 text-xs italic">Vui lòng nhập giá khuyễn mãi sách</p>
      </div>
    <div class="mb-3">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rating_average">
    Xếp hạng
  </label>
  <input class=" appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="rating_average" type="text" value="${
    book.rating_average
  }">
  <p class="text-red-500 text-xs italic">Vui lòng nhập xếp hạng sách</p>
  </div>
  <div class="mb-3 flex items-start">
  <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="active">
  Active
  </label>
  <input type="checkbox" name="" id="active" class="mx-1 mt-[1px]" ${
    book.active && "checked"
  }>
  </div>
    </div>
    <button type="submit" class="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">Cập nhập</button>
      </form>
  </div>
      `;
};
export default UpdateBook;
