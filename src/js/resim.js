import navbars from "./components/nabvar";
import carousel from "./components/carousel";
import modal from "./components/modal";
import ripples from "./components/ripple";

carousel();
navbars();
modal();
ripples();


const observer = new MutationObserver((mutations)=>{
   carousel();
   navbars();
   modal();
   ripples();
})

observer.observe(document.querySelector('body'), {
   childList: true,
   subtree:true
})

observer.disconnect();