function activeNavbar(){
   let navbarBtn = document.querySelector('[data-toggle=navbar]');
   let navbars_btn_sublist = Array.from(document.querySelectorAll('[data-toggle=navbar_sublist]'));
   let backdrop = document.createElement("div");
   let navbar = null;

   if(navbarBtn){
      let data_target = navbarBtn.dataset.target;       
      
      navbarBtn.addEventListener('click',(e)=>{      
         navbar = document.querySelector(`${data_target}`);
         navbar.classList.toggle('navbar--active');

         if(document.body.outerHTML.includes(backdrop.outerHTML)){
            document.body.removeChild(backdrop);
         }else{
            backdrop.classList.add("backdrop")
            backdrop.style.zIndex = "10";
            document.body.appendChild(backdrop);
         }
      })         
   
   }

   if(navbars_btn_sublist.length > 0){
      navbars_btn_sublist.forEach((el)=>{
         let btnNavbarSublist = el;
         let navbar_sublist = document.querySelector(`${el.dataset.target}`);
         btnNavbarSublist.addEventListener("click", ()=>{
            if(innerWidth < 1024){
               navbar_sublist.classList.toggle("navbar__sublist--active");
            }
         })
      })
   }
   
   const removeMenu = ()=>{
      navbar.classList.remove('navbar--active')
      if(document.body.outerHTML.includes(backdrop.outerHTML)){
         document.body.removeChild(backdrop);
      }
   }

   window.addEventListener("resize",()=>{
      if(document.body.outerHTML.includes(backdrop.outerHTML) && innerWidth >= 1024 && navbar != null){
         document.body.removeChild(backdrop);
         navbar.classList.remove('navbar--active')
         navbars_btn_sublist.forEach((el)=>{
            let navbar_sublist = document.querySelector(`${el.dataset.target}`);
            navbar_sublist.classList.remove("navbar__sublist--active")
         })
      }
   })

   window.addEventListener('click', (e)=>{
      if(e.target != navbarBtn && navbar){
         if(!navbar.innerHTML.includes(e.target.innerHTML)){
            removeMenu();      
         }else if(e.target.href){
            if(!e.target.href.includes("#")){
               removeMenu();      
            }
         }
         if(e.target.outerHTML.includes("backdrop")){
            removeMenu();
         }
      }
      
   })
}

module.exports = activeNavbar;