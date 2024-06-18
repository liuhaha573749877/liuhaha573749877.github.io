document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel img");
    const spans = document.querySelectorAll('.hero-text span');
    const heroImage = document.getElementById('heroImage');
    const contactForm = document.getElementById("contactForm");
    let currentIndex = 0;
    const carouselInterval = 3000;
    let autoSlide;

    // 初始化函数
    function init() {
        startAutoSlide();
        fadeOutText();
        addEventListeners();
    }

    // 自动轮播功能
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, carouselInterval);
    }

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    // 点击英雄图片滚动到下一部分
    function scrollToNextSection() {
        const nextSection = document.getElementById('gallery');
        window.scrollTo({
            top: nextSection.offsetTop,
            behavior: 'smooth'
        });
    }

    // 键盘事件处理
    function handleKeyDown(event) {
        if (event.key === " ") {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
            restartAutoSlide();
        }
    }

    function restartAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // 淡出文本动画
    function fadeOutText() {
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = '0';
            }, index * 100);
        });
    }

    // 表单验证
    function validateForm() {
        const nameInput = document.getElementById("name").value;
        const emailInput = document.getElementById("email").value;
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        let valid = true;

        nameError.textContent = "";
        emailError.textContent = "";

        if (nameInput.trim() === "") {
            nameError.textContent = "请填写姓名";
            valid = false;
        }

        if (!emailInput.includes("@")) {
            emailError.textContent = "请填写有效的电子邮件地址";
            valid = false;
        }

        return valid;
    }

    // 表单提交处理
    function handleFormSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            alert("感谢您联系我们！");
            contactForm.reset();
        }
    }

    // 添加事件监听器
    function addEventListeners() {
        heroImage.addEventListener('click', scrollToNextSection);
        document.addEventListener("keydown", handleKeyDown);
        contactForm.addEventListener("submit", handleFormSubmit);
    }

    init();
});
