/* 
   🎯 SCRIPT: MEDICAL CONVERSION & TRAFFIC LOGIC
   DESIGNED FOR: DR. NASHWAN AL-KHAWLANI DENTAL CENTER
   YEAR: 2026
*/

document.addEventListener("DOMContentLoaded", function() {
    // 1. تتبع الروابط وتخصيص رسائل واتساب ذكية بناءً على القسم لرفع معدل التحويل لـ 100%
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const currentTitle = document.title;
            let customMessage = `مرحباً دكتور نشوان، أود الاستفسار والحجز في المركز بخصوص الخدمات الطبية المتطورة المذكورة في صفحة: (${currentTitle}).`;
            
            // تغيير الرسالة تلقائياً إذا كان المريض يتصفح جراحة معقدة
            if (window.location.href.includes("specialties")) {
                customMessage = `مرحباً دكتور نشوان، أود حجز موعد استشارة جراحية تخصصية عاجلة ومعاينة بخصوص التخصص الرقمي والجراحي المعقد بالمركز.`;
            } else if (window.location.href.includes("articles")) {
                customMessage = `مرحباً دكتور نشوان، قمت بقراءة الدليل والتشخيص الطبي في مدونتكم وأود حجز موعد فحص وتأكيد الأعراض في المركز.`;
            }
            
            const encodedMessage = encodeURIComponent(customMessage);
            window.open(`https://wa.me/967779690850?text=${encodedMessage}`, '_blank');
        });
    });

    console.log("Premium Healthcare System Active - Dr. Nashwan Dental Center.");
});