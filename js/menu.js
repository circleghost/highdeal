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