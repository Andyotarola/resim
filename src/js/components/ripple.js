function ripples(){
   
     let ripples_btn = Array.from(document.querySelectorAll("[class*='ripple']"));
     let nowRippleActive = null;
     let nowRippleAnimate = null;

   ripples_btn.forEach((ripple)=>{

      window.addEventListener("click",(e)=>{
         if(nowRippleAnimate && nowRippleActive && !e.target.className.includes("ripple")){
            removeRippleAnimation(nowRippleActive, nowRippleAnimate)
         }
      })

      ripple.addEventListener("mousedown",(e)=>{
         addRippleAnimation(ripple, e);
      })

      ripple.addEventListener("mouseup", ()=>{
         if(nowRippleAnimate && nowRippleActive){
            removeRippleAnimation(nowRippleActive, nowRippleAnimate)
         }
      })

      let count =  0;

      ripple.addEventListener("keypress", (e)=>{
         if(e.keyCode === 13 && count === 0){
            addRippleAnimation(ripple, e);
         }
         count++;
      })

      ripple.addEventListener("keyup", (e)=>{
         if(e.keyCode === 13 && nowRippleAnimate && nowRippleActive){
            count = 0;
            removeRippleAnimation(nowRippleActive, nowRippleAnimate)
         }
      })

      ripple.addEventListener("mouseleave", ()=>{
         if(nowRippleAnimate && nowRippleActive){
            removeRippleAnimation(nowRippleActive, nowRippleAnimate)
         }
      })
      
   })

   const addRippleAnimation = (ripple, e)=>{
      let ripple_active = document.createElement("span");
      let ripple_animate = document.createElement("span");
      let rippleHeight = ripple.getBoundingClientRect().height;
      let rippleWidth = ripple.getBoundingClientRect().width;
      let animateSize = Math.sqrt(Math.pow((rippleHeight / 2), 2) + Math.pow((rippleWidth / 2), 2)) * 2;
      let yAxis = (animateSize - rippleHeight) / 2;
      let xAxis = (animateSize - rippleWidth) / 2;
      let moveX = e.clientX - ripple.getBoundingClientRect().left; 
      let moveY = e.clientY - ripple.getBoundingClientRect().top;
      let size =  parseInt(Math.min(ripple.offsetWidth, ripple.offsetHeight) * 0.5);
      nowRippleActive = ripple_active;
      nowRippleAnimate = ripple_animate;

      ripple_active.classList.add("ripple--active");
      ripple_animate.classList.add("ripple--animate");         
      ripple.appendChild(ripple_active);  
      ripple_active.appendChild(ripple_animate);
      ripple_animate.style.opacity = "0"
      ripple_animate.style.transform = `translate(${moveX}px, ${moveY}px)`   
      ripple_animate.style.height = size + "px"
      ripple_animate.style.width = size + "px"
      
      
      setTimeout(()=>{
         ripple_animate.style.height = animateSize + "px";
         ripple_animate.style.width = animateSize + "px";
         ripple_animate.style.transform = `translate(-${xAxis}px, -${yAxis}px) scale3d(1, 1, 1)`;               
         ripple_animate.style.opacity = ".2";
      }, .0001)

   }

   const removeRippleAnimation = (rippleActive, rippleAnimate)=>{
      setTimeout(()=>{
         rippleActive.style.opacity = "0";
      }, 200)
      
      setTimeout(()=>{
         rippleActive.remove();
      }, 330)
   }

}


module.exports = ripples;