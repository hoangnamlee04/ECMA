import Header from "../components/header"
import Slider from "../components/slider"
import Sidebar from "../components/sidebar"
import Tabs from "../components/tabs-option"
import Products from "../components/products"
import Footer from "../components/footer"
const HomePage = {
  render: (books) => {
    return `
    ${Header()}
       <main class="mt-10 bg-white color-text">
         <div class="max-w-screen-xl mx-auto pt-[14px] flex pb-16">
           <!--start Sidebar -->
        ${Sidebar.render()}
           <!--end Sidebar -->
           <!--start content -->
           <div class="content grow ml-24">
             <h2 class="pl-4 text-[23px] font-normal mb-3">
               <a href="">Nhà Sách Tiki</a>
             </h2>
             <!-- slider -->
             ${Slider.render()}
             <!-- end slider  -->
            ${Tabs.render()}
             <!-- end tabs option -->
             <!-- start list-product -->
             <div id="products">
             ${Products.render(books)}</div>
           </div>
           <!--end content -->
         </div>
       </main>
     ${Footer()}      
     `;
  }
};
export default HomePage;