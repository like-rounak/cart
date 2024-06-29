document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

let products = [];
let displayedProducts = [];

function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            applyInitialFilter(category);
        })
        .catch(error => console.error("Error fetching products:", error));
}

function displayProducts(productsToDisplay) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            </a>
            <button onclick="likeProduct(${product.id})">❤</button>
        `;

        container.appendChild(productCard);
    });
}

function applyInitialFilter(category) {
    let filteredProducts = products;

    if (category) {
        switch (category) {
            case "women":
                filteredProducts = products.filter(product => product.category === "women's clothing");
                document.getElementById("filter-women").checked = true;
                document.getElementById("category-title").innerText = "Women's Clothing";
                break;
            case "men":
                filteredProducts = products.filter(product => product.category === "men's clothing");
                document.getElementById("filter-men").checked = true;
                document.getElementById("category-title").innerText = "Men's Clothing";
                break;
            case "electronics":
                filteredProducts = products.filter(product => product.category === "electronics");
                document.getElementById("filter-electronics").checked = true;
                document.getElementById("category-title").innerText = "Electronics";
                break;
            case "jewellery":
                filteredProducts = products.filter(product => product.category === "jewelery");
                document.getElementById("filter-jewellury").checked = true;
                document.getElementById("category-title").innerText = "Jewellery";
                break;
        }
    } else {
        document.getElementById("category-title").innerText = "All Products";
    }

    displayedProducts = filteredProducts;
    displayProducts(filteredProducts);
}

function applyFilters() {
    const filterJewellery = document.getElementById("filter-jewellury").checked;
    const filterElectronics = document.getElementById("filter-electronics").checked;
    const filterMen = document.getElementById("filter-men").checked;
    const filterWomen = document.getElementById("filter-women").checked;

    let filteredProducts = products;

    if (!filterJewellery && !filterElectronics && !filterMen && !filterWomen) {
        filteredProducts = products; // Show all products if no filter is selected
    } else {
        filteredProducts = products.filter(product => {
            if (filterJewellery && product.category === "jewelery") return true;
            if (filterElectronics && product.category === "electronics") return true;
            if (filterMen && product.category === "men's clothing") return true;
            if (filterWomen && product.category === "women's clothing") return true;
            return false;
        });
    }

    displayedProducts = filteredProducts;
    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortOrder = document.getElementById("sort-price").value;

    displayedProducts.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);

    displayProducts(displayedProducts);
}

function likeProduct(id) {
    alert(`Liked product with id: ${id}`);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
