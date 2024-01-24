const cardContainer = document.querySelector("#cardContainer");


/*Displays the products from the array in product.js onto the shop page. */
function addProducts(){
    products.forEach(individualCard => {
        cardContainer.innerHTML += `
            <div class="card" id="cardNumber${individualCard.id}">
                <img src="${individualCard.image}" alt="${individualCard.description}">
                <div class="cardText">
                    <h4>${individualCard.name}</h4>
                    <p>${individualCard.description}</p>
                    <p>&dollar; ${individualCard.price}</p>
                    <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
                </div>
            </div>
        `;
    });
}
addProducts();


/*Saves anything added to the cart into the local storage. */
function saveToLocalStorage(){
    let cartButton = document.getElementsByClassName("cartButton");
    for(let i = 0; i < cartButton.length; i++){
        cartButton[i].addEventListener("click", function(){
            let selectedProduct = products.find((product) => product.id == cartButton[i].id);
            let cartItemSearch = cart.find((cartItem) => cartItem.id == selectedProduct.id);
            
            /*If the clicked product is already in the cart, the quantity is increased instead of
            addding a whole new item. */
            if(cartItemSearch){
                cartItemSearch.quantity++;
            }
            else{
                cart.push(selectedProduct);
            }
            
            /*Updates the local storage with what's currently in the cart. */
            localStorage.setItem("CART", JSON.stringify(cart));
            displayCart();
        }, false);
    }
}
saveToLocalStorage();


/*Displays products in the cart on shop.html. */
function displayCart(){
    initializeCart();

    sideBarContainer.innerHTML = "";

    cart.forEach((cartItem) => {
        sideBarContainer.innerHTML += `
            <div class="tableRow">
                <div class="tableCell">${cartItem.name}</div>
                <div class="tableCell">&dollar; ${cartItem.price}</div>
            </div>
            <div class="tableRow">
                <div class="tableCell borderBottom">
                    <input class="quantityNumberInput" id="${cartItem.id}" type="number" value="${cartItem.quantity}" min="1" max="5">
                </div>
                <a href="#" id="${cartItem.id}" class="tableCell borderBottom removeLink">Remove</a>
            </div>
        `;
    });

    removeFromCart();
    updateQuantity();
}
displayCart();


let checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", function(){
    window.location.href = 'cart.html';
},false);