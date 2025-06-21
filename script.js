/* 
    ملف JavaScript الرئيسي لموقع مركز الدكتور نشوان الخولاني
    يحتوي على:
    1. تأثيرات شريط التنقل (Navbar)
    2. قائمة التنقل للهواتف (Mobile Navigation)
    3. أكورديون الأسئلة الشائعة (FAQ Accordion)
    4. زر العودة للأعلى (Back to Top Button)
    5. تحديث سنة الحقوق تلقائيًا (Copyright Year)
    6. تفعيل Lightbox لمعرض الصور
    7. تهيئة مكتبة التأثيرات الحركية (AOS)
    8. (معلق مؤقتًا) كود للتحميل البطيء للصور ونموذج الحجز
*/

// يتم تنفيذ هذا الكود بعد تحميل محتوى الصفحة بالكامل (DOM)
document.addEventListener('DOMContentLoaded', function() {

    // 1. Navbar Scroll Effect & Active Link
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        if (!currentSectionId && window.scrollY < sections[0].offsetTop) {
             const homeLink = document.querySelector('.nav-menu a[href="#home"]');
             if(homeLink) homeLink.classList.add('active');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // 2. Mobile Navigation Toggle
    const navToggleButton = document.getElementById('nav-toggle-button');
    const navMenuItems = document.getElementById('nav-menu-items');

    if (navToggleButton && navMenuItems) {
        navToggleButton.addEventListener('click', () => {
            navMenuItems.classList.toggle('open');
            const isExpanded = navMenuItems.classList.contains('open');
            navToggleButton.setAttribute('aria-expanded', isExpanded);
            navToggleButton.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenuItems.classList.contains('open')) {
                    navMenuItems.classList.remove('open');
                    navToggleButton.setAttribute('aria-expanded', 'false');
                    navToggleButton.classList.remove('open');
                }
            });
        });
    }

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                item.classList.toggle('open');
                questionButton.setAttribute('aria-expanded', !isOpen);

                if (!isOpen) {
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                } else {
                    answerDiv.style.maxHeight = null;
                }
            });
        }
    });

    // 4. Back to Top Button
    const backToTopButton = document.getElementById('back-to-top-button');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Update Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 6. Lightbox for Gallery
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item a');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imageSrc = item.getAttribute('href');
                
                // التأكد من أن مكتبة basicLightbox متاحة
                if (typeof basicLightbox !== 'undefined') {
                    const instance = basicLightbox.create(`
                        <img src="${imageSrc}">
                    `);
                    instance.show();
                } else {
                    console.error('basicLightbox is not loaded.');
                }
            });
        });
    }


    /* 
    // 7. (معلق مؤقتًا) كود التحميل البطيء للصور ونموذج الحجز
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window && lazyImages.length > 0) {
        // ... الكود ...
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // ... الكود ...
    }
    */

}); // ****** نهاية مستمع حدث DOMContentLoaded ******


// ****** بداية تهيئة AOS (خارج DOMContentLoaded) ******
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: 'ease-in-out',
});
// ****** نهاية تهيئة AOS ******
