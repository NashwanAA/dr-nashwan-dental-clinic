document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");
    const sections = document.querySelectorAll("section[id]");

    // 1. إدارة التمرير وتحديث القائمة
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (navbar ? navbar.offsetHeight : 80) - 50;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", handleScroll);

    // 2. قائمة الموبايل (Mobile Menu)
    const navToggleButton = document.getElementById("nav-toggle-button");
    const navMenuItems = document.getElementById("nav-menu-items");

    if (navToggleButton && navMenuItems) {
        navToggleButton.addEventListener("click", () => {
            navMenuItems.classList.toggle("open");
            const isExpanded = navMenuItems.classList.contains("open");
            navToggleButton.setAttribute("aria-expanded", isExpanded);
            navToggleButton.classList.toggle("open");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenuItems.classList.remove("open");
                navToggleButton.classList.remove("open");
            });
        });
    }

    // 3. الأسئلة الشائعة (FAQ)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionButton = item.querySelector(".faq-question");
        const answerDiv = item.querySelector(".faq-answer");
        if (questionButton && answerDiv) {
            questionButton.addEventListener("click", () => {
                const isOpen = item.classList.contains("open");
                // إغلاق أي سؤال آخر مفتوح (تجربة مستخدم أفضل)
                faqItems.forEach(i => {
                    i.classList.remove("open");
                    i.querySelector(".faq-answer").style.maxHeight = null;
                });

                if (!isOpen) {
                    item.classList.add("open");
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                }
            });
        }
    });

    // 4. نموذج الحجز (إضافة منطق إرسال تنبيه)
    const appointmentForm = document.getElementById("appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // هنا يمكن إضافة كود EmailJS أو إظهار رسالة نجاح
            alert("شكراً لك يا دكتور، تم استلام طلب الحجز بنجاح. سنتواصل معك فوراً.");
            appointmentForm.reset();
        });
    }

    // 5. زر العودة للأعلى
    const backToTopButton = document.getElementById("back-to-top-button");
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });
        backToTopButton.addEventListener("click", e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 6. تحديث السنة تلقائياً
    const yearSpan = document.getElementById("year");
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }
});

// تهيئة مكتبة الأنميشن (تأكد من استدعاء ملف AOS CSS/JS في الـ HTML)
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
}