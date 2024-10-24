// Lista de produtos
const products = [
    {
        id: 1,
        name: "Notebook Dell Inspiron 15",
        description: "Notebook Dell Inspiron 15 3000",
        price: 2999.99,
        category: "laptops",
        brand: "Dell",
        images: ["assets/notebook-dell.jpg"]
    },
    {
        id: 2,
        name: "Monitor LG 24'",
        description: "Monitor LG 24' LED Full HD",
        price: 899.99,
        category: "monitors",
        brand: "LG",
        images: ["assets/monitor-lg.jpg"]
    },
    {
        id: 3,
        name: "Teclado HyperX",
        description: "Teclado Mecânico Gamer HyperX Alloy FPS",
        price: 299.99,
        category: "keyboards",
        brand: "HyperX",
        images: ["assets/teclado-hyperx.jpg"]
    },
    {
        id: 4,
        name: "Mouse Gamer Redragon",
        description: "Mouse Gamer Redragon Storm Elite, 16000DPI",
        price: 249.99,
        category: "mouse",
        brand: "Redragon",
        images: ["assets/mouse.jpg"]
    },
    {
        id: 5,
        name: "Headset Gamer Redragon",
        description: "Headset Gamer Redragon ZEUS X, Wireless",
        price: 469.99,
        category: "headset",
        brand: "Redragon",
        images: ["assets/headset.jpg"]
    },
    {
        id: 6,
        name: "Cadeira Heavy-SMI",
        description: "Cadeira Gamer Massageadora Heavy-SMI",
        price: 4299.99,
        category: "cadeira",
        brand: "MAXRACER",
        images: ["assets/cadeira.jpg"]
    }
];

// Função para adicionar ao carrinho
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        const productInCart = cart.find(item => item.id === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        showCartPopup(); // Mostrar popup de confirmação
    }
}

// Função para mostrar o popup de confirmação
function showCartPopup() {
    const cartPopup = document.getElementById("cart-popup");
    if (cartPopup) {
        cartPopup.classList.remove("hidden");

        document.getElementById("continue-shopping").addEventListener("click", () => {
            cartPopup.classList.add("hidden");
        });

        document.getElementById("go-to-cart").addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }
}

// Função para renderizar os produtos
function renderProducts(filteredProducts) {
    const productsContainer = document.getElementById("products");
    if (productsContainer) {
        productsContainer.innerHTML = "";
        filteredProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }
}

// Função para aplicar os filtros
function applyFilters() {
    const selectedCategory = document.getElementById("category-filter").value;
    const selectedBrand = document.getElementById("brand-filter").value;
    const searchTerm = document.getElementById("search-input").value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesBrand && matchesSearch;
    });

    renderProducts(filteredProducts);
}

// Função para renderizar o carrinho
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cartContainer) {
        cartContainer.innerHTML = "";
        if (cart.length > 0) {
            cart.forEach(item => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartItemDiv.innerHTML = `
                    <img src="${item.images[0]}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Preço: R$ ${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
                    </div>
                `;
                cartContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
        } else {
            cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        }

        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Função para atualizar a quantidade no carrinho
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find(item => item.id === productId);

    if (productInCart) {
        // Impedir que a quantidade seja menor que 1
        if (productInCart.quantity + change >= 1) {
            productInCart.quantity += change;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }
}

// Função para remover um produto do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Função para redirecionar para a página de checkout
function goToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        localStorage.setItem("orderTotal", total.toFixed(2)); // Salva o total do pedido
        window.location.href = "checkout.html"; // Redireciona para a página de checkout
    } else {
        alert("Seu carrinho está vazio!");
    }
}

// Inicialização dos eventos e renderização inicial
document.addEventListener("DOMContentLoaded", () => {
    // Outros eventos de filtro e busca

    // Verificar se estamos na página de carrinho
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", goToCheckout);
    }

    // Renderizar o carrinho, se na página de carrinho
    if (document.getElementById("cart-items")) {
        renderCart();
    }
});

// Inicialização dos eventos e renderização inicial
document.addEventListener("DOMContentLoaded", () => {
    // Eventos de filtro e busca
    const categoryFilter = document.getElementById("category-filter");
    const brandFilter = document.getElementById("brand-filter");
    const searchButton = document.getElementById("search-button");

    if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
    if (brandFilter) brandFilter.addEventListener("change", applyFilters);
    if (searchButton) searchButton.addEventListener("click", applyFilters);

    // Renderizar todos os produtos inicialmente
    renderProducts(products);

    // Renderizar o carrinho, se na página de carrinho
    if (document.getElementById("cart-items")) {
        renderCart();
    }
});
