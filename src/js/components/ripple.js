function ripples(){
   let ripples_btn = Array.from(document.querySelectorAll("[class*='ripple']"));

   ripples_btn.forEach((ripple)=>{
      ripple.addEventListener("mousedown",(e)=>{
         let ripple_div = document.createElement("span");
         let xAxis = e.clientX - ripple.getBoundingClientRect().left;
         let yAxis = e.clientY - ripple.getBoundingClientRect().top;
         let size =  parseInt(Math.min(ripple.offsetWidth, ripple.offsetHeight) * 0.5);
         let animateSize =  parseInt(Math.max(ripple.offsetWidth, ripple.offsetHeight) * Math.PI);

         ripple_div.style.top = `${yAxis}px`;
         ripple_div.style.left = `${xAxis}px`;

         ripple_div.classList.add("ripple--active")
         ripple.appendChild(ripple_div);    

         ripple_div.animate([
            {
               width: size + "px",
               height: size + "px",
               opacity: .2
            },
            {
               width: animateSize + "px",
               height: animateSize + "px",
               opacity: 0
            }
         ],{
            duration :750,
            iteration: Infinity
         })
         setTimeout(()=>{
            ripple_div.remove();
         }, 750)
      })
      
   })
}


module.exports = ripples;