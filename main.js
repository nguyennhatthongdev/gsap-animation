gsap.set("section", { opacity: 0, y: 100 });

var sections = document.querySelectorAll("section");
var sectionAnimations = [
    "fadeIn",
    "fadeOut",
    "slideIn",
    "slideOut",
    "rotate",
    "scale"
];
var contentAnimations = [
    { opacity: 0, x: -100 },
    { opacity: 0, x: 100 },
    { opacity: 0, y: -100 },
    { opacity: 0, y: 100 },
    { opacity: 0, x: -100, y: -100 },
    { opacity: 0, x: 100, y: -100 },
    { opacity: 0, x: -100, y: 100 },
    { opacity: 0, x: 100, y: 100 }
];
var easingFunctions = [
    "power1",
    "power2",
    "power3",
    "power4",
    "back",
    "elastic"
];

sections.forEach(function (section) {
    gsap.set(section, { opacity: 0, y: 100 });

    var tl = gsap.timeline({
        defaults: { duration: 0.5, ease: getRandomEase() },
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: updateAnimation,
            onEnter: animateContent
        }
    });

    function getRandomAnimation(animations) {
        var randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        var index = animations.indexOf(randomAnimation);
        if (index > -1) {
            animations.splice(index, 1);
        }
        return randomAnimation;
    }

    function getRandomEase() {
        var randomEase = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];
        return gsap.parseEase(randomEase);
    }

    function updateAnimation() {
        var randomAnimation = getRandomAnimation(sectionAnimations);
        section.setAttribute("class", randomAnimation);
    }

    function animateContent() {
        var contentElements = section.querySelectorAll(".content-element");
        contentElements.forEach(function (contentElement) {
            var randomAnimation =
                contentAnimations[Math.floor(Math.random() * contentAnimations.length)];
            gsap.set(contentElement, { opacity: 0, scale: 0.5 });
            gsap.to(contentElement, { opacity: 1, scale: 1, className: randomAnimation, duration: 1 });
        });
    }

    tl.to(section, { opacity: 1, y: 0, onComplete: animateContent });
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({ scroller: window });

ScrollTrigger.update();

ScrollTrigger.addEventListener("refresh", function () {
    ScrollTrigger.update();
});
