// 選單相關 JavaScript 功能

class ResponsiveMenu {
    constructor(menuSelector = '.nav-menu') {
        this.menu = document.querySelector(menuSelector);
        this.menuItems = this.menu?.querySelector('.menu-items');
        this.toggle = this.menu?.querySelector('.menu-toggle');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menu || !this.menuItems || !this.toggle) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.setupClickOutside();
        this.setupSubMenus();
        this.setupResizeHandler();
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('active', this.isOpen);
        this.toggle.setAttribute('aria-expanded', this.isOpen.toString());
    }

    setupClickOutside() {
        document.addEventListener('click', (event) => {
            if (this.isOpen && 
                !this.menu.contains(event.target) && 
                !this.toggle.contains(event.target)) {
                this.closeMenu();
            }
        });
    }

    setupSubMenus() {
        const subMenus = this.menu.querySelectorAll('.has-submenu');
        subMenus.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.submenu');
            
            if (link && submenu) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        submenu.style.display = 
                            submenu.style.display === 'block' ? 'none' : 'block';
                    }
                });
            }
        });
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
}

// 初始化選單
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveMenu();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navContainer = document.querySelector('.nav-container');
    const navItems = document.querySelectorAll('.nav-item');

    // 漢堡選單開關
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    });

    // 關閉按鈕
    menuClose.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 手機版下拉選單
    navItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            item.querySelector('a').addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('active');
                    this.classList.toggle('active');
                }
            });
        }
    });

    // 點擊選單外部關閉選單
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // 視窗大小改變時重置選單狀態
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}); 