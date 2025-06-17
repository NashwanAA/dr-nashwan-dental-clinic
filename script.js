/* 
    ملف JavaScript الرئيسي لموقع مركز الدكتور نشوان الخولاني
    يحتوي على:
    1. تأثيرات شريط التنقل (Navbar)
    2. قائمة التنقل للهواتف (Mobile Navigation)
    3. أكورديون الأسئلة الشائعة (FAQ Accordion)
    4. زر العودة للأعلى (Back to Top Button)
    5. تحديث سنة الحقوق تلقائيًا (Copyright Year)
    6. تهيئة مكتبة التأثيرات الحركية (AOS)
    7. (معلق مؤقتًا) كود للتحميل البطيء للصور ونموذج الحجز
*/

// يتم تنفيذ هذا الكود بعد تحميل محتوى الصفحة بالكامل (DOM)
document.addEventListener('DOMContentLoaded', function() {

    // 1. Navbar Scroll Effect & Active Link
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sections = document.querySelectorAll('section[id]');

    // دالة للتعامل مع التمرير
    function handleScroll() {
        // إضافة خلفية للـ navbar عند التمرير
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // تحديد الرابط النشط في القائمة بناءً على القسم المعروض
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

        // التعامل مع حالة عدم وجود قسم نشط (أعلى أو أسفل الصفحة)
        if (!currentSectionId && window.scrollY < sections[0].offsetTop) {
             const homeLink = document.querySelector('.nav-menu a[href="#home"]');
             if(homeLink) homeLink.classList.add('active');
        }
    }
    
    // إضافة مستمع الحدث للتمرير
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
                
                // يمكنك إلغاء التعليق عن هذا الجزء إذا أردت أن يتم إغلاق جميع الأسئلة الأخرى عند فتح سؤال جديد
                /*
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                */
                
                item.classList.toggle('open');
                questionButton.setAttribute('aria-expanded', !isOpen);

                if (!isOpen) { // إذا كان مغلقًا وسيتم فتحه
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                } else { // إذا كان مفتوحًا وسيتم إغلاقه
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


    /* 
    // ****** (معلق مؤقتًا) كود التحميل البطيء للصور ونموذج الحجز ******
    // لتفعيل هذه الميزات، ستحتاج إلى تعديلات على ملف index.html
    // 1. للتحميل البطيء: أضف class="lazy" لوسوم <img>، واستخدم data-src بدلاً من src للمسار.
    // 2. لنموذج الحجز: تأكد من وجود <form id="booking-form"> في HTML.

    // التحميل البطيء للصور
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window && lazyImages.length > 0) {
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

    // إدارة الحجوزات
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // هنا كود إرسال البيانات إلى الخادم (يتطلب برمجة متقدمة أو خدمة طرف ثالث)
            alert('تم استلام طلبك، سنتصل بك لتأكيد الموعد');
        });
    }
    */

}); // ****** هذا هو وسم الإغلاق الوحيد لـ DOMContentLoaded ******

// ****** بداية تهيئة AOS ******
// يتم وضع هذا الكود خارج مستمع DOMContentLoaded
AOS.init({
    duration: 800, // مدة التحريك بالمللي ثانية
    once: true,    // هل يتم التحريك مرة واحدة فقط؟ (true)
    offset: 50,    // إزاحة (بالبكسل) من أسفل الشاشة لبدء التحريك
    easing: 'ease-in-out', // نوع منحنى التسارع
});
// ****** نهاية تهيئة AOS ******
