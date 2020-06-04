function dropDowns(){
   let btnDropDowns = Array.from(document.querySelectorAll("[data-toggle=dropdown]"));
   let dropDownNow = null;

   if(btnDropDowns){
      btnDropDowns.forEach((btnDropDown)=>{
         let btn = btnDropDown;
         let data_target = btnDropDown.dataset.target; 
         let drop_down = document.querySelector(`${data_target}`);   
      
         btn.addEventListener("click", ()=>{

            if(dropDownNow === drop_down){
               if(!drop_down.className.includes("active")){
                  drop_down.classList.add("active");     
               }else{
                  drop_down.classList.remove("active");     
               }
            }else if(dropDownNow === null){
               if(!drop_down.className.includes("active")){
                  drop_down.classList.add("active");     
               }
            }else if(dropDownNow !== drop_down && dropDownNow !== null){
               drop_down.classList.add("active");     
               dropDownNow.classList.remove("active");     
            }
            dropDownNow = drop_down;
         })
      })
   }

   window.addEventListener("click", (e)=>{
      if(e.target.dataset.toggle !== "dropdown" && dropDownNow !== null){         
         dropDownNow.classList.remove("active");            
      }
   })
}

module.exports = dropDowns