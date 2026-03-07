// Menu Mobile
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Dados das pizzas
const pizzas = [
    // Tradicionais
    {
        id: 1,
        nome: 'Margherita',
        descricao: 'Molho de tomate, mussarela, manjericão e parmesão',
        preco: 45.90,
        imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
        categoria: 'tradicionais'
    },
    {
        id: 2,
        nome: 'Pepperoni',
        descricao: 'Molho de tomate, mussarela e pepperoni',
        preco: 49.90,
        imagem: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
        categoria: 'tradicionais'
    },
    {
        id: 3,
        nome: 'Calabresa',
        descricao: 'Molho de tomate, mussarela, calabresa e cebola',
        preco: 47.90,
        imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
        categoria: 'tradicionais'
    },
    // Especiais
    {
        id: 4,
        nome: 'Quatro Queijos',
        descricao: 'Mussarela, parmesão, gorgonzola e catupiry',
        preco: 54.90,
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
        categoria: 'especiais'
    },
    {
        id: 5,
        nome: 'Frango com Catupiry',
        descricao: 'Molho de tomate, mussarela, frango desfiado e catupiry',
        preco: 52.90,
        imagem: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300',
        categoria: 'especiais'
    },
    {
        id: 6,
        nome: 'Portuguesa',
        descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola e azeitonas',
        preco: 51.90,
        imagem: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300',
        categoria: 'especiais'
    },
    // Doces
    {
        id: 7,
        nome: 'Chocolate com Morango',
        descricao: 'Chocolate ao leite, morangos frescos e leite condensado',
        preco: 59.90,
        imagem: 'https://images.unsplash.com/photo-1565865641958-69e5a91e3f2b?w=300',
        categoria: 'doces'
    },
    {
        id: 8,
        nome: 'Banana com Canela',
        descricao: 'Banana caramelizada, canela e leite condensado',
        preco: 57.90,
        imagem: 'https://images.unsplash.com/photo-1612714086741-5a27c3f66aaf?w=300',
        categoria: 'doces'
    }
];

// Renderizar pizzas
const pizzasGrid = document.getElementById('pizzas-grid');

function renderizarPizzas(categoria = 'todos') {
    const pizzasFiltradas = categoria === 'todos' 
        ? pizzas 
        : pizzas.filter(pizza => pizza.categoria === categoria);
    
    pizzasGrid.innerHTML = pizzasFiltradas.map(pizza => `
        <div class="pizza-card">
            <img src="${pizza.imagem}" alt="${pizza.nome}">
            <div class="pizza-info">
                <h3>${pizza.nome}</h3>
                <p class="descricao">${pizza.descricao}</p>
                <span class="preco">R$ ${pizza.preco.toFixed(2)}</span>
                <button class="btn-comprar" data-id="${pizza.id}">
                    <i class="fas fa-shopping-cart"></i> Pedir
                </button>
            </div>
        </div>
    `).join('');

    // Adicionar eventos aos botões de compra
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pizzaId = btn.dataset.id;
            const pizza = pizzas.find(p => p.id == pizzaId);
            alert(`🍕 Pedido adicionado!\n\nPizza: ${pizza.nome}\nPreço: R$ ${pizza.preco.toFixed(2)}\n\nEm breve entraremos em contato para confirmar seu pedido!`);
        });
    });
}

// Filtrar pizzas
const filtros = document.querySelectorAll('.filtro-btn');

filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        // Remover active de todos
        filtros.forEach(f => f.classList.remove('active'));
        // Adicionar active ao clicado
        filtro.classList.add('active');
        // Renderizar pizzas da categoria selecionada
        renderizarPizzas(filtro.dataset.categoria);
    });
});

// Renderizar todas as pizzas ao carregar a página
renderizarPizzas();

// Formulário de contato
const contatoForm = document.getElementById('contato-form');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    contatoForm.reset();
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header transparente no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.pizza-card, .diferencial, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});
