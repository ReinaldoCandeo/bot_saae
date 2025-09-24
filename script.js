// JavaScript moderno para Loja do Japão
document.addEventListener('DOMContentLoaded', function() {
    
    // Variáveis globais
    let cartCount = 0;
    let cartItems = [];
    let isScrolling = false;
    
    // Elementos do DOM
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const bannerArrow = document.querySelector('.banner-arrow');
    const header = document.querySelector('.header');
    
    // Sistema de notificações melhorado
    class NotificationSystem {
        constructor() {
            this.notifications = [];
            this.createContainer();
        }
        
        createContainer() {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(this.container);
        }
        
        show(message, type = 'success', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-icon">
                        ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                    </div>
                    <div class="notification-text">${message}</div>
                    <button class="notification-close">&times;</button>
                </div>
            `;
            
            notification.style.cssText = `
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                transform: translateX(100%);
                transition: all 0.3s ease;
                max-width: 300px;
                font-weight: 500;
            `;
            
            this.container.appendChild(notification);
            
            // Animar entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Auto remover
            const autoRemove = setTimeout(() => {
                this.remove(notification);
            }, duration);
            
            // Botão fechar
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                clearTimeout(autoRemove);
                this.remove(notification);
            });
            
            this.notifications.push({ element: notification, timer: autoRemove });
        }
        
        remove(notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
    
    const notifications = new NotificationSystem();
    
    // Sistema de carrinho melhorado
    class CartSystem {
        constructor() {
            this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
            this.updateCartCount();
        }
        
        addItem(productName, price, image = '') {
            const item = {
                id: Date.now(),
                name: productName,
                price: price,
                image: image,
                quantity: 1,
                addedAt: new Date().toISOString()
            };
            
            // Verificar se item já existe
            const existingItem = this.items.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push(item);
            }
            
            this.saveToStorage();
            this.updateCartCount();
            this.animateCart();
            
            notifications.show(`${productName} adicionado ao carrinho!`, 'success');
        }
        
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveToStorage();
            this.updateCartCount();
        }
        
        updateCartCount() {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            
            if (totalItems > 0) {
                cartCountElement.style.display = 'flex';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
        
        animateCart() {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }
        
        saveToStorage() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        }
        
        getTotalPrice() {
            return this.items.reduce((total, item) => {
                const price = parseFloat(item.price.replace('R$ ', '').replace(',', ''));
                return total + (price * item.quantity);
            }, 0);
        }
    }
    
    const cart = new CartSystem();
    
    // Sistema de busca avançado
    class SearchSystem {
        constructor() {
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
            this.setupSearch();
        }
        
        setupSearch() {
            searchBtn.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
            
            // Busca em tempo real
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length > 2) {
                    this.showSuggestions(query);
                } else {
                    this.hideSuggestions();
                }
            });
        }
        
        performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                this.addToHistory(query);
                notifications.show(`Buscando por: "${query}"`, 'info');
                // Aqui você pode implementar a lógica de busca real
                console.log('Buscando:', query);
            }
        }
        
        addToHistory(query) {
            if (!this.searchHistory.includes(query)) {
                this.searchHistory.unshift(query);
                this.searchHistory = this.searchHistory.slice(0, 10); // Manter apenas 10 itens
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }
        }
        
        showSuggestions(query) {
            // Implementar sugestões de busca
            console.log('Sugestões para:', query);
        }
        
        hideSuggestions() {
            // Esconder sugestões
        }
    }
    
    const search = new SearchSystem();
    
    // Sistema de animações
    class AnimationSystem {
        constructor() {
            this.setupScrollAnimations();
            this.setupHoverAnimations();
            this.setupLoadingAnimations();
        }
        
        setupScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observar elementos para animação
            document.querySelectorAll('.product-item, .category-item').forEach(el => {
                observer.observe(el);
            });
        }
        
        setupHoverAnimations() {
            // Animações de hover nos produtos
            document.querySelectorAll('.product-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Animações de hover nas categorias
            document.querySelectorAll('.category-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
        
        setupLoadingAnimations() {
            // Animação de carregamento
            window.addEventListener('load', () => {
                document.body.classList.add('loaded');
                notifications.show('Bem-vindo à Loja do Japão! 🎌', 'success', 5000);
            });
        }
    }
    
    const animations = new AnimationSystem();
    
    // Sistema de scroll inteligente
    class ScrollSystem {
        constructor() {
            this.lastScrollTop = 0;
            this.setupScrollBehavior();
        }
        
        setupScrollBehavior() {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
        
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header behavior
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Back to top button
            if (scrollTop > 300) {
                this.showBackToTop();
            } else {
                this.hideBackToTop();
            }
            
            this.lastScrollTop = scrollTop;
        }
        
        showBackToTop() {
            if (!document.querySelector('.back-to-top')) {
                const btn = document.createElement('button');
                btn.className = 'back-to-top';
                btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                btn.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    right: 2rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-lg);
                `;
                
                btn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                
                document.body.appendChild(btn);
            }
        }
        
        hideBackToTop() {
            const btn = document.querySelector('.back-to-top');
            if (btn) {
                btn.remove();
            }
        }
    }
    
    const scrollSystem = new ScrollSystem();
    
    // Event listeners para botões "Adicionar ao Carrinho"
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            const productImage = productItem.querySelector('.product-image img')?.src || '';
            
            cart.addItem(productName, productPrice, productImage);
            
            // Animação do botão
            this.style.background = '#10b981';
            this.textContent = 'Adicionado!';
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'Adicionar ao Carrinho';
            }, 1500);
        });
    });
    
    // Funcionalidade do WhatsApp
    whatsappBtn.addEventListener('click', function() {
        const message = 'Olá! Gostaria de saber mais sobre os produtos da Loja do Japão!';
        const phoneNumber = '5511999999999';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Funcionalidade da seta do banner
    bannerArrow.addEventListener('click', function() {
        notifications.show('Navegando para mais produtos...', 'info');
    });
    
    // Funcionalidade dos departamentos
    const departmentsBtn = document.querySelector('.departments-btn');
    departmentsBtn.addEventListener('click', function() {
        notifications.show('Menu de departamentos em breve!', 'info');
    });
    
    // Funcionalidade dos links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('i').className;
            notifications.show(`Navegando para categoria...`, 'info');
        });
    });
    
    // Funcionalidade dos botões especiais
    const blogBtn = document.querySelector('.btn-blog');
    const saleBtn = document.querySelector('.btn-sale');
    
    blogBtn.addEventListener('click', function() {
        notifications.show('Redirecionando para o blog...', 'info');
    });
    
    saleBtn.addEventListener('click', function() {
        notifications.show('Mostrando promoções...', 'info');
    });
    
    // Funcionalidade das categorias
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            notifications.show(`Explorando categoria: ${categoryName}`, 'info');
        });
    });
    
    // Funcionalidade do botão "Conhecer todos"
    const discoverBtn = document.querySelector('.btn-discover');
    discoverBtn.addEventListener('click', function() {
        notifications.show('Redirecionando para todos os produtos...', 'info');
    });
    
    // Funcionalidade do botão "Assistir vídeo"
    const watchBtn = document.querySelector('.btn-watch');
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            notifications.show('Abrindo vídeo...', 'info');
        });
    }
    
    // Sistema de teclado
    document.addEventListener('keydown', function(e) {
        // ESC para fechar notificações
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            });
        }
        
        // Enter para buscar
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            searchBtn.click();
        }
        
        // Ctrl + K para focar na busca
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Sistema de responsividade
    function handleResize() {
        const width = window.innerWidth;
        const isMobile = width < 768;
        
        // Ajustes para mobile
        if (isMobile) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Executar na carga inicial
    
    // Adicionar transição suave ao header
    header.style.transition = 'transform 0.3s ease-in-out';
    
    // Performance: Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('🎌 Loja do Japão - Site carregado com sucesso!');
    console.log('🚀 Funcionalidades ativas:', {
        notifications: '✅',
        cart: '✅',
        search: '✅',
        animations: '✅',
        scroll: '✅'
    });
});