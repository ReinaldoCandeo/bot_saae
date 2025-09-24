// JavaScript para funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
    
    // Variáveis globais
    let cartCount = 0;
    let cartItems = [];
    
    // Elementos do DOM
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const bannerArrow = document.querySelector('.banner-arrow');
    
    // Funcionalidade de busca
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Buscando por: "${searchTerm}"`);
            // Aqui você pode implementar a lógica de busca real
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Funcionalidade do carrinho
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
    }
    
    function addToCart(productName, price) {
        cartCount++;
        cartItems.push({ name: productName, price: price });
        updateCartCount();
        
        // Animação do carrinho
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        // Mostrar notificação
        showNotification(`${productName} adicionado ao carrinho!`);
    }
    
    // Event listeners para botões "Adicionar ao Carrinho"
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            
            addToCart(productName, productPrice);
            
            // Animação do botão
            this.style.background = '#10b981';
            this.textContent = 'Adicionado!';
            setTimeout(() => {
                this.style.background = '#dc2626';
                this.textContent = 'Adicionar ao Carrinho';
            }, 1500);
        });
    });
    
    // Funcionalidade do WhatsApp
    whatsappBtn.addEventListener('click', function() {
        const message = 'Olá! Gostaria de saber mais sobre os produtos da Loja do Japão!';
        const phoneNumber = '5511999999999'; // Substitua pelo número real
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Funcionalidade da seta do banner
    bannerArrow.addEventListener('click', function() {
        // Aqui você pode implementar a navegação do carrossel
        showNotification('Navegando para mais produtos...');
    });
    
    // Funcionalidade dos departamentos
    const departmentsBtn = document.querySelector('.departments-btn');
    departmentsBtn.addEventListener('click', function() {
        showNotification('Menu de departamentos em breve!');
    });
    
    // Funcionalidade dos links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('i').className;
            showNotification(`Navegando para categoria...`);
        });
    });
    
    // Funcionalidade dos botões especiais
    const blogBtn = document.querySelector('.btn-blog');
    const saleBtn = document.querySelector('.btn-sale');
    
    blogBtn.addEventListener('click', function() {
        showNotification('Redirecionando para o blog...');
    });
    
    saleBtn.addEventListener('click', function() {
        showNotification('Mostrando promoções...');
    });
    
    // Funcionalidade das categorias
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showNotification(`Explorando categoria: ${categoryName}`);
        });
    });
    
    // Sistema de notificações
    function showNotification(message) {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Funcionalidade de scroll suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Funcionalidade de busca em tempo real
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 2) {
            // Aqui você pode implementar busca em tempo real
            console.log('Buscando:', searchTerm);
        }
    });
    
    // Funcionalidade de hover nos produtos
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Funcionalidade de hover nas categorias
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Funcionalidade do botão "Conhecer todos"
    const discoverBtn = document.querySelector('.btn-discover');
    discoverBtn.addEventListener('click', function() {
        showNotification('Redirecionando para todos os produtos...');
        // Aqui você pode implementar a navegação para a página de produtos
    });
    
    // Funcionalidade de carregamento
    window.addEventListener('load', function() {
        showNotification('Bem-vindo à Loja do Japão! 🇯🇵');
    });
    
    // Funcionalidade de teclado
    document.addEventListener('keydown', function(e) {
        // ESC para fechar modais (se houver)
        if (e.key === 'Escape') {
            console.log('ESC pressionado');
        }
        
        // Enter para buscar
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            searchBtn.click();
        }
    });
    
    // Funcionalidade de responsividade
    function handleResize() {
        const width = window.innerWidth;
        if (width < 768) {
            // Ajustes para mobile
            console.log('Modo mobile ativado');
        } else {
            // Ajustes para desktop
            console.log('Modo desktop ativado');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Executar na carga inicial
    
    // Funcionalidade de scroll para header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Adicionar transição suave ao header
    header.style.transition = 'transform 0.3s ease-in-out';
    
    console.log('Loja do Japão - Site carregado com sucesso! 🇯🇵');
});