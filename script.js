/* =========================
   Smooth Scroll للتنقل الداخلي
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   تأثير ظهور العناصر عند التمرير
========================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll(".card, .section h2, .contact-box").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


/* =========================
   إضافة CSS للحركة (ديناميكي)
========================= */
const style = document.createElement("style");

style.innerHTML = `
.hidden {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
}

.show {
    opacity: 1;
    transform: translateY(0);
}
`;

document.head.appendChild(style);


/* =========================
   تحسين تجربة الضغط على الأزرار
========================= */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
});


/* =========================
   تحسين الأداء (اختياري)
========================= */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});