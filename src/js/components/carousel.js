function carousel(){
   let container = document.querySelector("[data-toggle=carousel]");
   let next = document.querySelector("[data-toggle=carousel_next]");
   let prev = document.querySelector("[data-toggle=carousel_prev]");
   let carousel_controls = Array.from(document.querySelector("[data-toggle=carousel_controls]").children);
   
   if(container && next && prev && carousel_controls){
      // Contines todos los sliders del carousel
      let items = Array.from(container.children);

      // Intervalo para la animación del carousel
      let timer = null;

      // Coloca el primer slider como activo
      items[0].classList.add("carousel__active");
      carousel_controls[0].classList.add("active");
      
      // Variable donde se almacena el índice del  slider activo
      let item_active = 0;

      // Funcion para navegar entre slider(items)
      const navigate = (item_reset, type="next")=>{

         carousel_controls.forEach((element, index)=>{
            if(item_active !== index){
               carousel_controls[index].classList.remove("active");
            }
         })

         if(items.length > item_active + 1 && type === "next" ){
            items[item_active].classList.remove("carousel__active");
            
            container.style.transform = `translateX(${(item_active+1)*-100}%)`;
            container.style.transitionDuration = "300ms";
            
            items[item_active+1].classList.add("carousel__active");
            
            carousel_controls[item_active].classList.remove("active");
            carousel_controls[item_active+1].classList.add("active");
            
         }else if(item_active != 0 && type === "prev"){
            items[item_active].classList.remove("carousel__active");
            
            container.style.transform = `translateX(${(item_active-1)*-100}%)`;
            container.style.transitionDuration = "300ms";
            
            items[item_active-1].classList.add("carousel__active");
            
            carousel_controls[item_active].classList.remove("active");
            carousel_controls[item_active-1].classList.add("active");
            
         }else{
            items[item_active].classList.remove("carousel__active");
            
            container.style.transform = `translateX(${(item_reset)*-100}%)`;
            container.style.transitionDuration = "300ms";
            
            items[item_reset].classList.add("carousel__active");
            
            carousel_controls[item_active].classList.remove("active");
            carousel_controls[item_reset].classList.add("active");
         }
      }
      
      // Actualiza  el indice del slider,en la variable "item_active" que tenga la clase "carousel_active".
      const update_slider = ()=>{
         items.forEach((item,i)=>{
            if(item.getAttribute("class").includes("carousel__active")){
               item_active = i;
            }
         })
      }

      // Función para empezar la animación del carousel
      const startCarouselAnimation = ()=>{
         timer = setInterval(()=>{
            update_slider();
            navigate(0);
         },6000);
      }

      // Función para detener la animación del carousel
      const stopCarouselAnimation = ()=>{
         clearInterval(timer);
      }

      // Empezar la animación del carousel
      startCarouselAnimation();

      // controls del carousel

      carousel_controls.forEach((el, i)=>{
         el.addEventListener("click", ()=>{
            stopCarouselAnimation();
            
            carousel_controls.forEach((element, index)=>{
               if(item_active !== index){
                  carousel_controls[index].classList.remove("active");
               }
            })

            items[item_active].classList.remove("carousel__active");
            
            carousel_controls[item_active].classList.remove("active");
            
            item_active = i;
            
            container.style.transform = `translateX(${(item_active)*-100}%)`;
            container.style.transitionDuration = "300ms";
            
            items[item_active].classList.add("carousel__active");
            
            carousel_controls[item_active].classList.add("active");
            
            startCarouselAnimation();
         })
      })

      // Animación de onda al botón de navigación(next, prev)
      let ripple = document.createElement("div");
   
      next.addEventListener("mousedown", ()=>{
         stopCarouselAnimation();      
         
         // Cuando haces click al botón de navigación,pero sin soltar el click, entonces ocurre la animacipon de onda
         ripple.classList.add("carousel__ripple");
         
         next.appendChild(ripple);
      });

      next.addEventListener("mouseup", ()=>{
         startCarouselAnimation();

         // Cuando sueltas el click ,entonces la animación termina
         next.removeChild(ripple);
         
         update_slider();

         // Slider de reinicio, cuando está en el último slider
         navigate(0);

      });

      // Slider anterior.Si es el primer slider,entonces vuelve al ultimo slider
      prev.addEventListener("mousedown", ()=>{
         stopCarouselAnimation();

         ripple.classList.add("carousel__ripple");

         prev.appendChild(ripple);
      })

      prev.addEventListener("mouseup", ()=>{
         startCarouselAnimation();

         prev.removeChild(ripple);

         update_slider();
         
         // Slider de reinicio, cuando está en el primer slider
         navigate(items.length-1, "prev");
         
      })
      
      // Punto de inicio.Cuando el slider se mueve con el dedo o mouse.
      let point_start = 0;
      
      // Cambio de slider mediante el touch
      container.addEventListener('touchstart', (event)=>{
         container.style.transitionDuration = "0ms";

         // Al momento de hacer un toque en el carousel ,se actualiza el item(slider) activo.
         update_slider();
         
         stopCarouselAnimation();


         // Se guarda el punto del eje X, al momento de tocar el carousel.
         point_start = event.touches[0].clientX

         container.addEventListener("touchmove", (e)=>{
            stopCarouselAnimation();
            // Se guarda el punto del eje X ,al momento de mover el dedo en el carousel.
            let point_move = point_start - e.changedTouches[0].clientX;
            container.style.transform = `translateX(calc(${item_active*-100}% - ${point_move}px))`;
         })
         
      })

      container.addEventListener('touchend', (e)=>{
         // Se guarda el punto del eje X , al momento de quitar el dedo del carousel.
         let point_end = e.changedTouches[0].clientX;

         if(point_start > point_end && point_start - point_end > innerWidth / 3){
            navigate(0);
         }else if(point_start < point_end && point_end - point_start > innerWidth / 3){
            navigate(items.length-1, "prev");
         }else{
            container.style.transitionDuration = "300ms";
            container.style.transform = `translateX(${item_active*-100}%)`;
         }
         startCarouselAnimation();

      })

      // Cambio de slider mediante el mouse.

      let inside_carousel = false;

      container.addEventListener('mousedown',(event)=>{
         container.style.transitionDuration = "0ms";
         inside_carousel = true;      
         update_slider();
         point_start = event.clientX;
         stopCarouselAnimation();
      })

      container.addEventListener("mousemove", (e)=>{
         if(inside_carousel){
            stopCarouselAnimation();
            let point_move = point_start - e.clientX;
            container.style.transform = `translateX(calc(${item_active*-100}% - ${point_move}px))`;
         }
      })
      
      container.addEventListener("mouseup", (e)=>{
         inside_carousel = false;
         let point_end = e.clientX;

         if(point_start > point_end && point_start - point_end > innerWidth / 3){
            navigate(0);
         }else if(point_start < point_end && point_end - point_start > innerWidth / 3){
            navigate(items.length-1, "prev");
         }else{
            container.style.transitionDuration = "300ms";
            container.style.transform = `translateX(${item_active*-100}%)`;
         }
         startCarouselAnimation();
         
      })
   }
   
}

module.exports = carousel;