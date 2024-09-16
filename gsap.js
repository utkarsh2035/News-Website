const main = document.querySelector("#main")
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e)=>{
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration:.8,
        ease: "back.out"
    })
})
    
const tl = gsap.timeline();
tl.from("nav img", {
    y: -30,
    duration: .5,
    opacity: 0
})
tl.from(".items p", {
    opacity: 0,
    stagger:.2,
    duration:.5,
    y:-30
})
tl.from("#searchbar", {
    opacity: 0,
    duration:.5,
    y:-30
})
tl.from("#search-btn", {
    opacity: 0,
    duration:.5,
    y:-30
})
