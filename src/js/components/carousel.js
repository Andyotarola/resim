function carousel() {
   let carousels = document.querySelectorAll("[data-toggle=carousel]");
   let nexts = Array.from(document.querySelectorAll("[data-toggle=carousel_next]"));
   let prevs = Array.from(document.querySelectorAll("[data-toggle=carousel_prev]"));
   let carousel_controls_div = Array.from(document.querySelectorAll("[data-toggle=carousel_controls]"));

   // Índice para los controls del carousel.
   let index_controls_div = -1;

   // Índice para los navigations del carousel
   let index_navigation = -1;

   if (carousels) {
      carousels.forEach((carousel) => {

         let container = carousel;
         let carousel_html = carousel.parentElement;
         let items = Array.from(container.children);
         let next = null;
         let prev = null;
         let carousel_controls = null;
         let item_active = 0;
         let control_active = 0;
         let timer = null;
         let interval = container.dataset.interval != null ? +container.dataset.interval : null;
         
         index_navigation++;
         index_controls_div++;

         if(carousel_html.innerHTML.includes("carousel__controls")){
            carousel_controls = Array.from(carousel_controls_div[index_controls_div].children);
            carousel_controls[0].classList.add("active");
         }else{
            index_controls_div--;
         }

         if(carousel_html.innerHTML.includes("carousel__prev") && carousel_html.innerHTML.includes("carousel__next")){
            next = nexts[index_navigation]; 
            prev = prevs[index_navigation];        
         }else{
            index_navigation--;
         }

         if(carousel_html.innerHTML.includes("carousel__controls")){
            carousel_controls.forEach((el, i) => {
               el.addEventListener("click", () => {
                  stopCarouselAnimation();
                  updateItemActive();
                  updateControlActive(i);
                  navigate("controls");
                  startCarouselAnimation();
               })
            })
         }

         if(carousel_html.innerHTML.includes("carousel__prev") && carousel_html.innerHTML.includes("carousel__next")){

            next.addEventListener("click", () => {
               stopCarouselAnimation();
               updateItemActive();
               
               if(item_active === items.length -1){
                  updateControlActive(0);
               }else{
                  updateControlActive(item_active + 1);
               }
               navigate("next");
               startCarouselAnimation();
            });

         
            prev.addEventListener("click", () => {
               stopCarouselAnimation();
               updateItemActive();
               if(item_active === 0){
                  updateControlActive(items.length - 1);
               }else{
                  updateControlActive(item_active - 1);
               }
               navigate("prev");
               startCarouselAnimation();
            })
         }

         // Punto de inicio.Cuando el slider se mueve con el dedo o mouse.
         let point_start = 0;

         // Cambio de slider mediante el touch
         container.addEventListener('touchstart', (event) => {
            point_start = event.touches[0].clientX
         })

         container.addEventListener('touchend', (e) => {
            // Se guarda el punto del eje X , al momento de quitar el dedo del carousel.
            let point_end = e.changedTouches[0].clientX;

            if (point_start > point_end && point_start - point_end > container.offsetWidth / 10) {
               stopCarouselAnimation();
               updateItemActive();

               if(item_active === items.length -1){
                  updateControlActive(0);
               }else{
                  updateControlActive(item_active + 1);
               }
               
               navigate("next");
               startCarouselAnimation();

            } else if (point_start < point_end && point_end - point_start > container.offsetWidth / 10) {
               stopCarouselAnimation();
               updateItemActive();

               if(item_active === 0){
                  updateControlActive(items.length - 1);
               }else{
                  updateControlActive(item_active - 1);
               }
               navigate("prev");
               startCarouselAnimation();

            }
            // startCarouselAnimation();

         })
         // Función para empezar la animación del carousel
         const startCarouselAnimation = () => {
            if(interval !== null){
               timer = setInterval(() => {
                  if(item_active === items.length -1){
                     updateControlActive(0);
                  }else{
                     updateControlActive(item_active + 1);
                  }
                  navigate("next");
               }, interval);
            }
         }
         startCarouselAnimation();

         // Función para detener la animación del carousel
         const stopCarouselAnimation = () => {
            clearInterval(timer);
         }

         const updateItemActive = () => {

            items.forEach((item, i) => {
               if (item.getAttribute("class").includes("carousel__active")) {
                  item_active = i;
               }
            })
         }

         const updateControlActive = (controlActive)=>{
            control_active = controlActive;
            
            if(carousel_html.innerHTML.includes("carousel__controls")){
               
               carousel_controls.forEach((element, index) => {
                  if (item_active !== index) {
                     carousel_controls[index].classList.remove("active");
                  }
                  
                  carousel_controls[item_active].classList.remove("active");
                  carousel_controls[control_active].classList.add("active"); 
                     
               })
            }
         }

         let inside = true;

         const carouselAnimate = (afterClass, beforeClass)=>{

            if(inside){
               items.forEach((el)=>{
                  el.classList.remove(beforeClass);
                  el.classList.remove(afterClass); 
               })
   
               items[control_active].classList.add(afterClass);
               
               setTimeout(()=>{
                  items[item_active].classList.add(beforeClass);
                  items[control_active].classList.add(beforeClass);
               }, 15)
            }
         
            items[item_active].addEventListener("transitionend", ()=>{            
               inside = true;
               items.forEach((el)=>{
                  el.classList.remove("carousel__active");
                  el.classList.remove(beforeClass);
                  el.classList.remove(afterClass); 
               })
               items[control_active].classList.add("carousel__active");
               updateItemActive();
            })
            inside = false;
         }

         const navigate = (type) => {
            if(type === "controls"){
               if(item_active !== control_active){
                  if(item_active < control_active){
                     carouselAnimate("carousel__item--next", "carousel__item--left");
                  }else{
                     carouselAnimate("carousel__item--prev", "carousel__item--right");
                  }
               }
            }else if(type === "next"){
               carouselAnimate("carousel__item--next", "carousel__item--left");
            }else if(type === "prev"){
               carouselAnimate("carousel__item--prev", "carousel__item--right");
            } 
         }
      })
   }

}

module.exports = carousel;