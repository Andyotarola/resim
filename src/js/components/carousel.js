function carousel() {
   let carousels = document.querySelectorAll("[data-toggle=carousel]");
   let nexts = Array.from(document.querySelectorAll("[data-toggle=carousel_next]"));
   let prevs = Array.from(document.querySelectorAll("[data-toggle=carousel_prev]"));
   let carousel_controls_div = Array.from(document.querySelectorAll("[data-toggle=carousel_controls]"));

   // Índice para los controls del carousel.
   let index_controls_div = -1;

   // Índice para los navigations del carousel
   let index_nagigation = -1;

   if (carousels) {
      carousels.forEach((carousel) => {
         let container = carousel;
         let carousel_controls = null;
         let next = null;
         let prev = null;

         index_nagigation++;
         index_controls_div++;

         // El padre del carousel__container
         let carousel_html = carousel.parentElement;

         if(carousel_html.innerHTML.includes("carousel__controls")){
            carousel_controls = Array.from(carousel_controls_div[index_controls_div].children);
            carousel_controls[0].classList.add("active");
         }else{

            // ¿Porque resto?.Pongamos un ejemplo:
            // Si hay 3 carouseles
            // El primer carousel no tiene controls
            // EL segundo carousel no  tiene controls
            // El tercer carousel si tiene controls

            // Según el codigo el "índice de los controls" aumenta a cada vuelta,
            // entonces "SI NO RESTO " a la tercera vuelta(o sea el tercer carousel) que si tiene controls
            // el "índice de los controls" seria 2, pero según la variable "carousel_controls_div"(almacena todos los contenedores de los controls) habría solo 1 contenedor,entonces pediriamos lo siquente:
            // carousel_controls = Array.from(carousel_controls_div[2].children);
            // Pero solo hay 1 contenedor y le estamos pidiendo algo que no existe ,esa es la razón por la que resto,
            // si el carousel no tiene "controls" entonces lo resto en esa vuelta del bucle, lo mismo pasa con los "navigations(prev,next)" del carousel
            

            index_controls_div--;
         }
         if(carousel_html.innerHTML.includes("carousel__prev") && carousel_html.innerHTML.includes("carousel__next")){
            next = nexts[index_nagigation]; 
            prev = prevs[index_nagigation];        
         }else{
            index_nagigation--;
         }


         // Contines todos los sliders del carousel
         let items = Array.from(container.children);

         // SetInterval para la animación del carousel
         let timer = null;

         // Coloca el primer slider como activo
         items[0].classList.add("carousel__active");
         

         // Variable donde se almacena el índice del  slider activo
         let item_active = 0;

         // Funcion para navegar entre slider(items)
         const navigate = (item_reset, type = "next") => {

            if(carousel_html.innerHTML.includes("carousel__controls")){
               carousel_controls.forEach((element, index) => {
                  if (item_active !== index) {
                     carousel_controls[index_controls_div].classList.remove("active");
                  }
               })   
            }

            if (items.length > item_active + 1 && type === "next") {
               items[item_active].classList.remove("carousel__active");

               container.style.transform = `translateX(${(item_active+1)*-100}%)`;
               container.style.transitionDuration = "300ms";

               items[item_active + 1].classList.add("carousel__active");

               if(carousel_html.innerHTML.includes("carousel__controls")){
                  carousel_controls[item_active].classList.remove("active");
                  carousel_controls[item_active + 1].classList.add("active");
               }

            } else if (item_active != 0 && type === "prev") {
               items[item_active].classList.remove("carousel__active");

               container.style.transform = `translateX(${(item_active-1)*-100}%)`;
               container.style.transitionDuration = "300ms";

               items[item_active - 1].classList.add("carousel__active");

               if(carousel_html.innerHTML.includes("carousel__controls")){
                  carousel_controls[item_active].classList.remove("active");
                  carousel_controls[item_active - 1].classList.add("active");
               }

            } else {
               items[item_active].classList.remove("carousel__active");

               container.style.transform = `translateX(${(item_reset)*-100}%)`;
               container.style.transitionDuration = "300ms";

               items[item_reset].classList.add("carousel__active");

               if(carousel_html.innerHTML.includes("carousel__controls")){
                  carousel_controls[item_active].classList.remove("active");
                  carousel_controls[item_reset].classList.add("active");
               }
            }
         }

         // Actualiza  el indice del slider,en la variable "item_active" que tenga la clase "carousel_active".
         const update_slider = () => {
            items.forEach((item, i) => {
               if (item.getAttribute("class").includes("carousel__active")) {
                  item_active = i;
               }
            })
         }

         // Función para empezar la animación del carousel
         const startCarouselAnimation = () => {
            timer = setInterval(() => {
               update_slider();
               navigate(0);
            }, 6000);
         }

         // Función para detener la animación del carousel
         const stopCarouselAnimation = () => {
            clearInterval(timer);
         }

         // Empezar la animación del carousel
         startCarouselAnimation();

         // controls del carousel

         if(carousel_html.innerHTML.includes("carousel__controls")){
            carousel_controls.forEach((el, i) => {
               el.addEventListener("click", () => {
                  stopCarouselAnimation();
                  update_slider();
   
                  carousel_controls.forEach((element, index) => {
                     if (item_active !== index) {
                        carousel_controls[index_controls_div].classList.remove("active");
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
         }

         if(carousel_html.innerHTML.includes("carousel__prev") && carousel_html.innerHTML.includes("carousel__next")){
            // Animación de onda al botón de navigación(next, prev)
            let ripple = document.createElement("div");

            next.addEventListener("mousedown", () => {
               stopCarouselAnimation();

               // Cuando haces click al botón de navigación,pero sin soltar el click, entonces ocurre la animacipon de onda
               ripple.classList.add("carousel__ripple");

               next.appendChild(ripple);
            });

            next.addEventListener("mouseup", () => {
               startCarouselAnimation();

               // Cuando sueltas el click ,entonces la animación termina
               next.removeChild(ripple);

               update_slider();

               // Slider de reinicio, cuando está en el último slider
               navigate(0);

            });

            next.addEventListener("mouseleave", ()=>{
               next.removeChild(ripple)
            })

            // Slider anterior.Si es el primer slider,entonces vuelve al ultimo slider
            prev.addEventListener("mousedown", () => {
               stopCarouselAnimation();

               ripple.classList.add("carousel__ripple");

               prev.appendChild(ripple);
            })

            prev.addEventListener("mouseup", () => {
               startCarouselAnimation();

               prev.removeChild(ripple);

               update_slider();

               // Slider de reinicio, cuando está en el primer slider
               navigate(items.length - 1, "prev");

            })
            prev.addEventListener("mouseleave", ()=>{
               prev.removeChild(ripple)
            })
         }

         // Punto de inicio.Cuando el slider se mueve con el dedo o mouse.
         let point_start = 0;

         // Cambio de slider mediante el touch
         container.addEventListener('touchstart', (event) => {
            container.style.transitionDuration = "0ms";

            // Al momento de hacer un toque en el carousel ,se actualiza el item(slider) activo.
            update_slider();

            stopCarouselAnimation();


            // Se guarda el punto del eje X, al momento de tocar el carousel.
            point_start = event.touches[0].clientX

            container.addEventListener("touchmove", (e) => {
               stopCarouselAnimation();
               // Se guarda el punto del eje X ,al momento de mover el dedo en el carousel.
               let point_move = point_start - e.changedTouches[0].clientX;
               container.style.transform = `translateX(calc(${item_active*-100}% - ${point_move}px))`;
            })

         })

         container.addEventListener('touchend', (e) => {
            // Se guarda el punto del eje X , al momento de quitar el dedo del carousel.
            let point_end = e.changedTouches[0].clientX;

            if (point_start > point_end && point_start - point_end > container.offsetWidth / 3) {
               navigate(0);
            } else if (point_start < point_end && point_end - point_start > container.offsetWidth / 3) {
               navigate(items.length - 1, "prev");
            } else {
               container.style.transitionDuration = "300ms";
               container.style.transform = `translateX(${item_active*-100}%)`;
            }
            startCarouselAnimation();

         })

         // Cambio de slider mediante el mouse.

         let inside_carousel = false;

         container.addEventListener('mousedown', (event) => {
            container.style.transitionDuration = "0ms";
            inside_carousel = true;
            update_slider();
            point_start = event.clientX;
            stopCarouselAnimation();
         })

         container.addEventListener("mousemove", (e) => {
            if (inside_carousel) {
               stopCarouselAnimation();
               let point_move = point_start - e.clientX;
               container.style.transform = `translateX(calc(${item_active*-100}% - ${point_move}px))`;
            }
         })

         container.addEventListener("mouseup", (e) => {
            inside_carousel = false;
            let point_end = e.clientX;

            if (point_start > point_end && point_start - point_end > container.offsetWidth / 3) {
               navigate(0);
            } else if (point_start < point_end && point_end - point_start > container.offsetWidth / 3) {
               navigate(items.length - 1, "prev");
            } else {
               container.style.transitionDuration = "300ms";
               container.style.transform = `translateX(${item_active*-100}%)`;
            }
            startCarouselAnimation();
         })
         
      })
   }

}

module.exports = carousel;