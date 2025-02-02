// 主要 JavaScript 檔案

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeImageLazyLoading();
});

// 初始化選單功能
function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // 點擊選單外區域時關閉選單
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// 初始化圖片延遲載入
function initializeImageLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 載入延遲載入 polyfill
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// 視窗大小變更處理
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 992 && navMenu) {
        navMenu.classList.remove('active');
    }
}); 