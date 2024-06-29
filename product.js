document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    }
});

function fetchProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => displayProductDetails(product))
        .catch(error => console.error("Error fetching product details:", error));
}

function displayProductDetails(product) {
    const container = document.getElementById("product-detail");

    container.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="details">
            <h1>${product.title}</h1>
            <p class="price">$${product.price}</p>
            <div class="rating">
                ${generateStars(product.rating.rate)}
                <span>(${product.rating.count} reviews)</span>
            </div>
            <p>${product.description}</p>
            <div class="actions">
                <input type="number" value="1" min="1" id="quantity">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
            <div class="save-share-buttons">
                <button onclick="saveProduct(${product.id})">Save</button>
                <button onclick="shareProduct(${product.id})">Share</button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fa fa-star" aria-hidden="true"></i>';
        } else if (i < rating) {
            stars += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
        } else {
            stars += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
    }
    return stars;
}

function addToCart(productId) {
    const quantity = document.getElementById("quantity").value;
    alert(`Added ${quantity} of product with id: ${productId} to the cart`);
}

function saveProduct(productId) {
    alert(`Product with id: ${productId} saved`);
}

function shareProduct(productId) {
    const productUrl = window.location.href;
    alert(`Share this product link: ${productUrl}`);
}
