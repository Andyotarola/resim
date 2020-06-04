function cards(){
   let btnCards = Array.from(document.querySelectorAll("[data-toggle=card]"));

   if(btnCards){
      btnCards.forEach((btnCard)=>{
         let btn = btnCard;
         let data_target = btnCard.dataset.target;       
         let card = document.querySelector(`${data_target}`);        
         
         btn.addEventListener("click", ()=>{
            card.classList.add("card--active")
            card.addEventListener("click", (e)=>{
               if(e.target.dataset.dismiss === "card"){
                  card.classList.remove("card--active")
               }
            })
         })
      })
   }
}

module.exports = cards