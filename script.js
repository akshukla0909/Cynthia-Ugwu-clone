function init(){  
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init();
function circleMove(){
    window.addEventListener("mousemove",function(dets){
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
    })

    // window.addEventListener("mouseleave",function(dets){
    //   document.querySelector("#minicircle").style.display = 'none' 
    // })
}

var timeout; 

function circleFlat(){
    var xScale = 1; var yScale = 1;

    var xprev = 0; var yprev = 0;

    window.addEventListener("mousemove",function(dets){
      clearTimeout(timeout);

      xScale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev)
      yScale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev)

    })
  
    circleMove(xScale,yScale)

    timeout = setTimeout(function(){
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`

    })
}

circleMove();
circleFlat();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0; 

   elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),{
            opacity : 0 ,
            ease: Power3,
            duration: 0.5,
    })
   })

    elem.addEventListener("mousemove", function(dets){
       var diff = dets.clientY - elem.getBoundingClientRect().top;

       diffrot  = dets.clientX - rotate
       rotate = dets.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity  : 1, 
            ease : Power3,
            top : diff - '20px',
            left: dets.clientX,
            rotate :  gsap.utils.clamp(-20,20,diffrot *.5)
        })
    })
})

var tl = gsap.timeline();

function time(){
    var a = 0 ;
    setInterval(function(){
        a = a + Math.floor(Math.random()*20)
        if(a<100){
            document.querySelector(".loader h1")
            .innerHTML = a + "%"
        }
        else{
            a = 100;
            document.querySelector(".loader h1")
            .innerHTML = a + "%"
        }
    },50)
}

tl.to(".loader h1",{
    delay  : .1,
    duration : 1,
    onStart  : time(),
})

tl.to(".loader",{
    transform : 'translateY(-100%)',
    duration : 1.2,
    ease : Power1.easeOut
})

// var tl = gsap.timeline();

tl.from("nav",{
    delay : -1,
    x : -20,
    opacity :0,
    duration : 1.5
})

tl.to(".boundingelem",{
    y : 0,
    duration  : 1.5,
    delay  : -1,
    ease : Expo.easeInOut,
    // stagger : .4
})

tl.from("#footer",{
    y : '-5',
    opacity : 0,
    delay : -.5,
    ease : Expo.easeInOut,
})

let clock = document.querySelector("#set-time")

setInterval(function(){
  let d = new Date();
  clock.innerHTML = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
},1000)