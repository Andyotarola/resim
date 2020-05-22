import navbars from "./components/nabvar";
import carousel from "./components/carousel";

carousel();
navbars();

const observer = new MutationObserver((mutations)=>{
   carousel();
   navbars();
})

observer.observe(document.querySelector('body'), {
   childList: true,
   subtree:true
})

observer.disconnect();