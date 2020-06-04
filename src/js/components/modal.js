function modals(){
   let modalButtons = Array.from(document.querySelectorAll("[data-toggle=modal]"));
   let backdrop = document.createElement("div");
   let modalNow = null;
   let allModalDismmis = Array.from(document.querySelectorAll("[data-dismiss=modal]"))

   let focusedElementBeforeModal;
   
   let focusableElements;
   
   let firstTabStop;
   
   let lastTabStop;

   if(modalButtons.length > 0){
      modalButtons.forEach((modalButton,i)=>{
         
         let btn = modalButton;
         let data_target = modalButton.dataset.target;       
         let data_toggle = modalButton.dataset.toggle;
         let modal = document.querySelector(`${data_target}`);      

         btn.addEventListener("click", ()=>{
            modalNow = modal;
            modal.classList.add("modal--active")
            backdrop.classList.add("backdrop")
            backdrop.style.zIndex = "100"

            focusableFirst = document.activeElement;

            document.body.classList.add("backdrop-open");

            document.body.appendChild(backdrop);
            
            focusedElementBeforeModal = document.activeElement;
            
            modal.focus();
            document.addEventListener("keydown",trapTabKey);

            let focusableElementsString = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]';

            focusableElements = Array.from(modal.querySelectorAll(focusableElementsString));
            if(focusableElements.length > 0){
               firstTabStop = focusableElements[0];
               lastTabStop = focusableElements[focusableElements.length - 1];
            }

            let inside = true;

            function trapTabKey(e){   
               if(modalNow !== null){
                  if(focusableElements.length > 0){
                     if(e.keyCode === 9){
                        if(!e.shiftKey){
                           inside =  false;
                           if(document.activeElement === lastTabStop){
                              e.preventDefault();
                              firstTabStop.focus();
                           }                           
                        }else{
                           if(document.activeElement === firstTabStop){
                              e.preventDefault();
                              lastTabStop.focus();
                              inside =  false;
                           }
                           if(inside){            
                              e.preventDefault();
                              lastTabStop.focus();
                              inside = false;
                           }
                        }
                     }
                  }
                  
                  if(e.keyCode === 27){
                     persistentModal();
                  }                  
               }
            }
         
         })

      })
   }

   if(allModalDismmis.length > 0){
      allModalDismmis.forEach((modalDismiss)=>{
         modalDismiss.addEventListener("click",(e)=>{
            e.preventDefault();
            closeModal();
         })
      })
      
   }

   window.addEventListener("click", (e)=>{
      if(modalNow != null){
         if(e.target == modalNow ){
            persistentModal();
         }
      }
   })
               
   function closeModal(){
      document.body.removeChild(backdrop);
      document.body.classList.remove("backdrop-open");
      modalNow.classList.remove("modal--active");
      focusedElementBeforeModal.focus();
      modalNow = null;  
   }

   function persistentModal(){
      if(modalNow.dataset.backdrop === "static"){
         modalNow.firstElementChild.classList.add("modal--persistent")
         setTimeout(()=>{
            modalNow.firstElementChild.classList.remove("modal--persistent");                  
         },150)
      }else{
         closeModal();
      }
   }

}

module.exports = modals;