import navbars from "./components/nabvar";
import carousel from "./components/carousel";
import modal from "./components/modal";
import ripples from "./components/ripple";
import card from "./components/card";
import skeleton from "./components/skeleton";
import accordion from "./components/accordion";
import dropdown from "./components/dropdown";

carousel();
navbars();
modal();
ripples();
card();
skeleton();
accordion();
dropdown();

const observer = new MutationObserver((mutations)=>{
   carousel();
   navbars();
   modal();
   ripples();
   card();
   skeleton();
   accordion();
   dropdown();
})

observer.observe(document.querySelector('body'), {
   childList: true,
   subtree:true
})

observer.disconnect();