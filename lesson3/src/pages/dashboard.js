import { loading } from "../ultilities";
import AsideAdmin from "../components/admin/aside";
import ContentAdmin from "../components/admin/content";
const Dashboard = () => {
  document.addEventListener("DOMContentLoaded", () => loading());
  return /*html */ `
  <div class="min-h-screen bg-white">
        ${AsideAdmin()}
        <div class="p-4 xl:ml-80">
       ${ContentAdmin()}
       </div>
  </div>
    `;
};
export default Dashboard;