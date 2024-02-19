import { loading } from "../ultilities";
import AsideAdmin from "../components/admin/aside";
import UpdateBook from "../components/admin/updateBook";
const UpdateBookPages = (id) => {
  return /*html */ `
    <div class="min-h-screen bg-white">
          ${AsideAdmin()}
          <div class="p-4 xl:ml-80">
          
            ${UpdateBook(id)}
          </div>
    </div>
      `;
};
export default UpdateBookPages;