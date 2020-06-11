function ripples(){
   
   let ripples_btn = Array.from(document.querySelectorAll("[class*='ripple']"));
   let nowRippleActive = null;
   let nowRippleAnimate = null;
   let userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

   window.addEventListener("resize", ()=>{
      userAgent =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
   })

   window.addEventListener("mousedown",(e)=>{
      if(nowRippleAnimate && nowRippleActive){

         document.querySelectorAll("[class*=ripple--active]").forEach((ripple_active)=>{
            if(ripple_active !== nowRippleActive){
               removeRippleAnimation(ripple_active)               
            }
         })
      }
   })

   window.addEventListener("touchstart",()=>{
      if(nowRippleAnimate && nowRippleActive){
         document.querySelectorAll("[class*=ripple--active]").forEach((ripple_active)=>{
            if(ripple_active !== nowRippleActive){
               removeRippleAnimation(ripple_active)               
            }
         })
      }
   })

   ripples_btn.forEach((ripple)=>{
      
      ripple.addEventListener("mousedown",(e)=>{
         if(!userAgent){
            addRippleAnimation(ripple, e.clientX,  e.clientY);
         }
      })

      ripple.addEventListener("mouseup", ()=>{
         if(nowRippleAnimate && nowRippleActive && !userAgent){
            removeRippleAnimation(nowRippleActive)
         }
      })

      let count_key_press =  0;

      ripple.addEventListener("keypress", (e)=>{
         if(!userAgent){
            if((e.keyCode === 13 && count_key_press === 0) || 
               (e.keyCode === 32 && count_key_press === 0)){
               addRippleAnimation(ripple, e.clientX,  e.clientY);
            }
            count_key_press++;
         }
      })

      ripple.addEventListener("keyup", (e)=>{
         if(!userAgent){
            if((e.keyCode === 13 && nowRippleAnimate && nowRippleActive) ||
               (e.keyCode === 32 && nowRippleAnimate && nowRippleActive)
            ){
               count_key_press = 0;
               removeRippleAnimation(nowRippleActive)
            }
         }
      })

      ripple.addEventListener("mouseleave", ()=>{
         if(nowRippleAnimate && nowRippleActive && !userAgent){
            removeRippleAnimation(nowRippleActive)
         }
      })

      ripple.addEventListener("touchstart",(e)=>{            
         addRippleAnimation(ripple, e.touches[0].clientX,  e.touches[0].clientY);
      })
      
      ripple.addEventListener("touchend",(e)=>{
         if(nowRippleAnimate && nowRippleActive){
            removeRippleAnimation(nowRippleActive)               
         }
      })

      ripple.addEventListener("touchcancel",(e)=>{
         if(nowRippleAnimate && nowRippleActive){
            removeRippleAnimation(nowRippleActive)
         }
      })
   })
   
   const addRippleAnimation = (ripple, x, y)=>{
      let ripple_active = document.createElement("span");
      let ripple_animate = document.createElement("span");
      let rippleHeight = ripple.getBoundingClientRect().height;
      let rippleWidth = ripple.getBoundingClientRect().width;
      let animateSize = Math.sqrt(Math.pow((rippleHeight / 2), 2) + Math.pow((rippleWidth / 2), 2)) * 2;
      let yAxis = (animateSize - rippleHeight) / 2;
      let xAxis = (animateSize - rippleWidth) / 2;
      let moveX = x - ripple.getBoundingClientRect().left; 
      let moveY = y - ripple.getBoundingClientRect().top;
      let size =  Math.min(ripple.offsetWidth, ripple.offsetHeight)*0.5;
      nowRippleActive = ripple_active;
      nowRippleAnimate = ripple_animate;

      ripple_active.classList.add("ripple--active");
      ripple_animate.classList.add("ripple--animate");         
      ripple.appendChild(ripple_active);  
      ripple_active.appendChild(ripple_animate);

      ripple_animate.style.opacity = "0"
      ripple_animate.style.height = size + "px"
      ripple_animate.style.width = size + "px"
      
      ripple_animate.style.transform = `translate(${moveX - size*0.5}px, ${moveY - size*0.5}px)`   
      
      
      setTimeout(()=>{
         ripple_animate.style.opacity = ".2";
         ripple_animate.style.height = animateSize + "px";
         ripple_animate.style.width = animateSize + "px";
         ripple_animate.style.transform = `translate(-${xAxis}px, -${yAxis}px) scale3d(1, 1, 1)`;         
      }, .001)

   }

   const removeRippleAnimation = (rippleActive)=>{
      setTimeout(()=>{
         rippleActive.style.opacity = "0";
      }, 260)
      
      setTimeout(()=>{
         rippleActive.remove();
      }, 360)

   }
}


module.exports = ripples;