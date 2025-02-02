// 初始化選單功能
function initializeMenu() {
    console.log('初始化選單...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navContainer = document.querySelector('.nav-container');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 如果找不到必要元素，直接返回
    if (!menuToggle || !navContainer) {
        console.error('找不到必要的選單元素');
        return;
    }

    // 移除舊的事件監聽器
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

    // 重置選單狀態
    if (window.innerWidth <= 768) {
        navContainer.classList.remove('active');
        newMenuToggle.classList.remove('active');
    }
    
    // 手機版選單切換
    function toggleMenu(e) {
        console.log('切換選單...');
        e.preventDefault();
        e.stopPropagation();

        newMenuToggle.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.style.overflow = newMenuToggle.classList.contains('active') ? 'hidden' : '';
    }

    // 關閉選單
    function closeMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        newMenuToggle.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 綁定漢堡選單點擊事件
    newMenuToggle.addEventListener('click', toggleMenu);
    
    // 綁定關閉按鈕點擊事件
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    // 重新綁定子選單事件
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (link && dropdown) {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 關閉其他打開的子選單
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherDropdown = otherItem.querySelector('.dropdown-menu');
                            if (otherDropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                            }
                        }
                    });
                    
                    // 切換當前子選單
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // 處理視窗大小變化
    function handleResize() {
        if (window.innerWidth > 768) {
            navContainer.classList.remove('active');
            newMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // 重置所有子選單
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }

    // 監聽視窗大小變化
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
}

// 導出初始化函數
window.initializeMenu = initializeMenu;

// 確保在 DOM 載入完成後初始化選單
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenu);
} else {
    initializeMenu();
}

// 監聽 HTMX 事件
document.body.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.detail.target.matches('[hx-get*="header-template"]')) {
        console.log('頁首已載入，初始化選單');
        setTimeout(initializeMenu, 0);
    }
});

// 監聽 HTMX 頁面切換
document.body.addEventListener('htmx:afterSettle', function() {
    console.log('頁面已切換，重新初始化選單');
    initializeMenu();
}); 