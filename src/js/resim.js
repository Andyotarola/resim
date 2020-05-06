import navbars from "./components/nabvar";
import carousel from "./components/carousel";

navbars();
carousel();

const observer = new MutationObserver((mutations)=>{
   navbars();
})

observer.observe(document.querySelector('body'), {
   childList: true,
   subtree:true
})