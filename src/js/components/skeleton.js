function skeletons(){
   let skeleton = Array.from(document.querySelectorAll('div[class*="skeleton"]'));
 
   if(skeleton){
      skeleton.forEach((item, i) => {
         item.parentElement.classList.add("p-relative");
         item.style.height = item.parentElement.offsetHeight + "px";
      });
   
      window.onload = ()=>{
         skeleton.forEach((item, i) => {
            item.parentElement.classList.remove("p-relative");
            item.remove();
         });
      }
   }

}

module.exports = skeletons