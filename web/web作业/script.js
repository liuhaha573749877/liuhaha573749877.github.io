document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel img");
    let currentIndex = 0;
    const carouselInterval = 3000;
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, carouselInterval);

    
    function showImage(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(-${index * 100}%)`;
        });
    }
    
    // 点击图片自动向下
    const heroImage = document.getElementById('heroImage');

    
    heroImage.addEventListener('click', () => {
        const nextSection = document.getElementById('gallery');
        const scrollToPosition = nextSection.offsetTop;
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth' 
        });
    });

    // 空格键切换图片
    document.addEventListener("keydown", (event) => {
        if (event.key === " ") { 
            event.preventDefault(); //阻止默认的向下滑动

            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
            
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, carouselInterval);
        }
    });

    
    const spans = document.querySelectorAll('.hero-text span');

    function fadeOutText() {
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = '0';
            }, index * 100); 
        });
    }

    
    fadeOutText();

    // 表单验证函数
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
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        
        if (validateForm()) {
            alert("感谢您联系我们！");
            contactForm.reset();
        }
    });

});
