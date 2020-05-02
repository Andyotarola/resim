import navbars from "./components/nabvar";

navbars();

const observer = new MutationObserver((mutations)=>{
   navbars();
})

observer.observe(document.querySelector('body'), {
   childList: true,
   subtree:true
})