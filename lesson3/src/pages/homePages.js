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
        ${Sidebar.render()}
           <div class="content grow ml-24">
             <h2 class="pl-4 text-[23px] font-normal mb-3">
               <a href="">Nhà Sách Tiki</a>
             </h2>
             ${Slider.render()}
            ${Tabs.render()}
             <div id="products">
             ${Products.render(books)}</div>
           </div>
           
         </div>
       </main>
     ${Footer()}      
     `;
  }
};
export default HomePage;