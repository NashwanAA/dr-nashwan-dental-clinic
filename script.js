document.addEventListener('DOMContentLoaded', function() {

    // 1. Navbar Scroll Effect & Active Link
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sections = document.querySelectorAll('section[id]'); // جميع الأقسام التي لها ID

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50; // تعديل للإزاحة
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
         // إذا لم يتم العثور على قسم (مثل التمرير إلى التذييل)، قم بإلغاء تحديد الكل
        if (!currentSectionId && window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) { // بالقرب من أسفل الصفحة
            // يمكنك تحديد رابط "تواصل معنا" أو تركه بدون تحديد
        } else if (!currentSectionId && window.scrollY < sections[0].offsetTop) { // فوق القسم الأول
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.nav-menu a[href="#home"]');
             if(homeLink) homeLink.classList.add('active');
        }

    });

    // 2. Mobile Navigation Toggle
    const navToggleButton = document.getElementById('nav-toggle-button');
    const navMenuItems = document.getElementById('nav-menu-items');

    if (navToggleButton && navMenuItems) {
        navToggleButton.addEventListener('click', () => {
            navMenuItems.classList.toggle('open');
            const isExpanded = navMenuItems.classList.contains('open');
            navToggleButton.setAttribute('aria-expanded', isExpanded);
            navToggleButton.classList.toggle('open'); // لتبديل شكل أيقونة الهامبرغر
        });

        // إغلاق القائمة عند النقر على رابط فيها (للهواتف)
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

                // إغلاق جميع الأسئلة الأخرى (اختياري)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item && otherItem.classList.contains('open')) {
                //         otherItem.classList.remove('open');
                //         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //         otherItem.querySelector('.faq-answer').style.paddingTop = '0';
                //         otherItem.querySelector('.faq-answer').style.paddingBottom = '0';
                //     }
                // });

                item.classList.toggle('open');
                questionButton.setAttribute('aria-expanded', !isOpen);

                if (!isOpen) { // إذا كان مغلقًا وسيتم فتحه
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                    answerDiv.style.paddingTop = "10px"; // أضفنا هذا في CSS لكن نؤكده هنا
                    answerDiv.style.paddingBottom = "20px"; // أضفنا هذا في CSS لكن نؤكده هنا
                } else { // إذا كان مفتوحًا وسيتم إغلاقه
                    answerDiv.style.maxHeight = null;
                     // إعادة الـ padding إلى ما كان عليه عند الإغلاق التدريجي
                    answerDiv.style.paddingTop = '0';
                    answerDiv.style.paddingBottom = '0';
                }
            });
        }
    });

    // 4. Back to Top Button
    const backToTopButton = document.getElementById('back-to-top-button');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // إظهار الزر بعد تمرير 300 بكسل
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // منع السلوك الافتراضي للرابط
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

    // تحميل أسرع للصور
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// إدارة الحجوزات
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // هنا كود إرسال البيانات إلى الخادم
    alert('تم استلام طلبك، سنتصل بك لتأكيد الموعد');
});
}); // End of DOMContentLoaded
    // ... كل الكود الموجود حاليًا في script.js ...

    }); // هذا هو وسم الإغلاق لدالة DOMContentLoaded

// ****** بداية تهيئة AOS ******
AOS.init({
    duration: 800, // مدة التحريك بالمللي ثانية (يمكنك تغييرها)
    once: true, // هل يتم التحريك مرة واحدة فقط؟ (true) أم في كل مرة يظهر العنصر (false)
    offset: 50, // إزاحة (بالبكسل) من أسفل الشاشة لبدء التحريك
    easing: 'ease-in-out', // نوع منحنى التسارع
});
// ****** نهاية تهيئة AOS ******
