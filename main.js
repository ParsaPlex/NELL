// Initialize Locomotive Scroll
const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1.2,
    lerp: 0.05
});

// GSAP Plugins Registration
gsap.registerPlugin(ScrollTrigger);

// 1. Preloader Logic
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to(".progress-fill", { width: "100%", duration: 2.5, ease: "power2.inOut" })
      .to("#preloader", { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
      .from(".reveal-text", { y: 150, skewY: 10, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5")
      .from(".nav-container", { y: -100, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");
});

// 2. Magnetic Buttons Engine
const magneticBtns = document.querySelectorAll('.magnetic');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const bound = btn.getBoundingClientRect();
        const x = e.clientX - bound.left - bound.width / 2;
        const y = e.clientY - bound.top - bound.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
});

// 3. Automated Testimonial Slider (Every 5 Seconds)
const testimonials = document.querySelectorAll('.testi-item');
let currentTesti = 0;

function nextTestimonial() {
    testimonials[currentTesti].classList.remove('active');
    currentTesti = (currentTesti + 1) % testimonials.length;
    testimonials[currentTesti].classList.add('active');
}

setInterval(nextTestimonial, 5000);

// 4. Scroll Header Animation
scroller.on('scroll', (args) => {
    if (args.scroll.y > 100) {
        gsap.to(".nav-container", { width: "80%", padding: "5px 30px", duration: 0.5 });
    } else {
        gsap.to(".nav-container", { width: "90%", padding: "10px 30px", duration: 0.5 });
    }
});

// 5. Parallax for Product Image
scroller.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});
