import { loading } from "../ultilities";
import AsideAdmin from "../components/admin/aside";
import newBook from "../components/admin/newbook";
const newBookPage = () => {
  return /*html */ `
    <div class="min-h-screen bg-white">
          ${AsideAdmin()}
          <div class="p-4 xl:ml-80">
          
            ${newBook()}
          </div>
    </div>
      `;
};
export default newBookPage;
