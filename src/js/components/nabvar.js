function activeNavbar(){
   let navbars = Array.from(document.querySelectorAll('[data-toggle=navbar]'));
   let navbars_sublist = Array.from(document.querySelectorAll('[data-toggle=navbar_sublist]'));
   let backdrop = document.createElement("div");
   
   if(navbars.length > 0){
      navbars.forEach((el,i)=>{
         let navbar = null;
         let btn = el;
         let data_target = el.dataset.target;       
         let data_toggle = el.dataset.toggle;
      
         navbar = document.querySelector(`${data_target}`);
         
         // Altura de la lista del navbar
         let navbar_height = 0;

         // Almacena la altura de la lista del navbar en la variable "navbar_height".Lo almacena calculando la suma de todos los items que están detro de la lista del navbar
         let navbar_items = Array.from(navbar.children).map((element)=>{
            navbar_height +=  element.scrollHeight
            return el.scrollHeight;
         })
   
         if(data_toggle === 'navbar'){
            btn.addEventListener('click',()=>{   
               navbar.classList.toggle('navbar--active');
               
               if(document.body.outerHTML.includes(backdrop.outerHTML)){
                  document.body.removeChild(backdrop);
               }else{
                  backdrop.classList.add("backdrop")
                  document.body.appendChild(backdrop);
               }
               if(navbar.parentElement.parentElement.getAttribute('class').includes('collapse')){
                  if(navbar.style.height === "" || navbar.style.height === "0px"){   
                     navbar.style.height = navbar_height + "px";
                  }else{
                     navbar.style.height = "0px";  
                  }
               }
            })         
         }

      })

   }

   // Mostrar sublista del navbar

   if(navbars_sublist.length > 0){
      navbars_sublist.forEach((el,i)=>{
         let btn = el;
         let data_target  = el.getAttribute('data-target');       
         let data_toggle  = el.getAttribute('data-toggle');       
         let navbar_list = document.querySelector(data_target);
         
         btn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(innerWidth < 1024){
               if(data_toggle === 'navbar_sublist'){
                  if(navbar_list.style.display === "" || navbar_list.style.display === "none"){
                     navbar_list.style.display = "block";    
                  }else{
                     navbar_list.style.display = "none";
                  }
               }
            }
            
         })         
      
      })
   }

   // Quitar el navbar, si el innerHTML del click no está dentro del innerHTML del contenedor "div.navbar__list"
   
   const removeMenu = ()=>{
      navbar.classList.remove('navbar--active')
      if(navbar.parentElement.parentElement.getAttribute('class').includes('collapse')){
         navbar.style.height = "0px";
      }
      if(document.body.outerHTML.includes(backdrop.outerHTML)){
         document.body.removeChild(backdrop);
      }
   }

   window.addEventListener("resize",()=>{
      if(document.body.outerHTML.includes(backdrop.outerHTML)){
         document.body.removeChild(backdrop);
      }
   })

   window.addEventListener('click', (e)=>{
      navbars.forEach((el,i)=>{
         let data_target = el.dataset.target;       
         navbar = document.querySelector(`${data_target}`);
         if(!el.parentElement.innerHTML.includes(e.target.innerHTML)){
            removeMenu();
         }
         if(e.target.outerHTML.includes("backdrop")){
            removeMenu();
         }

      })
   })
}

module.exports = activeNavbar;