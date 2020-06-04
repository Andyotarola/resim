function accordions(){
   let allAccordion = Array.from(document.querySelectorAll("[data-toggle=accordion]"));

   if(allAccordion){
      allAccordion.forEach((el)=>{
         let accordion = el;
         let accordionItems = Array.from(accordion.querySelectorAll("[class*=accordion__item]"));
         
         accordionItems.forEach((item, index)=>{
            item.addEventListener("click", (e)=>{                  
               if(e.target.className.includes("accordion__btn")){
                  if(accordion.className.includes("accordion__group")){
                     accordionItems.forEach((element,i )=>{
                        if(i !== index){
                           element.classList.remove("accordion__active");
                        }
                     })
                  }
                  if(item.className.includes("accordion__active")){
                     item.classList.remove("accordion__active");
                  }else{
                     item.classList.add("accordion__active");
                  }
               }
            })
         })

      })
   }

}

module.exports = accordions