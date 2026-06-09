/* ===================================
   DR NASHWAN DENTAL CENTER
   ENTERPRISE SCRIPT SYSTEM
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSmoothScroll();
    initializeStickyHeader();
    initializeRevealAnimations();
    initializeBackToTop();
    initializeLazyLoading();
    initializePerformanceMonitor();

});

/* ===================================
   SMOOTH SCROLL
=================================== */

function initializeSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}

/* ===================================
   STICKY HEADER EFFECT
=================================== */

function initializeStickyHeader() {

    const header =
        document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(255,255,255,.98)";

            header.style.backdropFilter =
                "blur(10px)";

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.08)";

        } else {

            header.style.background =
                "#ffffff";

            header.style.boxShadow =
                "0 2px 20px rgba(0,0,0,.05)";

        }

    });

}

/* ===================================
   REVEAL ANIMATION
=================================== */

function initializeRevealAnimations() {

    const elements = document.querySelectorAll(
        ".service-card, .article-card, .specialty-card, .feature-box, .faq-item, .contact-card"
    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-element"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    elements.forEach(element => {

        element.classList.add(
            "hidden-element"
        );

        observer.observe(element);

    });

}

/* ===================================
   BACK TO TOP BUTTON
=================================== */

function initializeBackToTop() {

    const button =
        document.createElement("button");

    button.innerHTML = "↑";

    button.id = "backToTop";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ===================================
   IMAGE LAZY LOAD
=================================== */

function initializeLazyLoading() {

    const images =
        document.querySelectorAll("img");

    images.forEach(img => {

        img.setAttribute(
            "loading",
            "lazy"
        );

    });

}

/* ===================================
   PERFORMANCE MONITOR
=================================== */

function initializePerformanceMonitor() {

    window.addEventListener("load", () => {

        const pageLoadTime =
            performance.now();

        console.log(
            `Page Loaded in ${pageLoadTime.toFixed(0)} ms`
        );

    });

}

/* ===================================
   GOOGLE ANALYTICS READY
=================================== */

function trackEvent(
    category,
    action,
    label = ""
) {

    if (typeof gtag === "function") {

        gtag("event", action, {

            event_category: category,

            event_label: label

        });

    }

}

/* ===================================
   WHATSAPP TRACKING
=================================== */

document.addEventListener("click", e => {

    const target =
        e.target.closest(
            'a[href*="wa.me"]'
        );

    if (!target) return;

    trackEvent(

        "WhatsApp",

        "Click",

        "Appointment Request"

    );

});

/* ===================================
   GOOGLE REVIEW TRACKING
=================================== */

document.addEventListener("click", e => {

    const target =
        e.target.closest(
            'a[href*="g.page"]'
        );

    if (!target) return;

    trackEvent(

        "Google Review",

        "Click",

        "Review Page"

    );

});