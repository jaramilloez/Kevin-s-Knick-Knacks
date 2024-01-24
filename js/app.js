let cart = [];
const sideBarContainer = document.querySelector("#sideBarContainer");


function initializeCart(){
    cart = [];
    let currentStorage = JSON.parse(localStorage.getItem('CART'));
    if(currentStorage){
        cart = currentStorage;
    }
};


function removeFromCart(){
    let removeLink = document.getElementsByClassName("removeLink");
    for(let i = 0; i < removeLink.length; i++){
        removeLink[i].addEventListener("click", (event) => {
            initializeCart();
            let selectedProduct = cart.find((cartItem) => cartItem.id == event.target.id);
            let itemIndex;

            for(let j = 0; j < cart.length; j++){
                if(cart[j].id == selectedProduct.id){
                    itemIndex = cart.indexOf(cart[j]);
                }
            };
            
            /*Removes the product that matches the removeLink that was clicked from the cart array,
            then updates the local storage with what's currently in the cart array. */
            cart.splice(itemIndex, 1);

            /*Updates the local storage with what's currently in the cart. */
            localStorage.setItem('CART', JSON.stringify(cart));
            
            /*This first if statement only executes on shop.js, and the 2nd if statement only
            executes on cart.js */
            if(typeof displayCart === "function"){
                displayCart();
            };
            if(typeof displayCartProducts === "function"){
                displayCartProducts();
                displayOrderSummary();
            }
            
            if(cart.length == 0){
                localStorage.clear();
            }
        }, false);
    };
};


function clearCart(){
    const clearCartButton = document.getElementById("clearCartButton");
    clearCartButton.addEventListener("click", function(){
        cart = [];
        localStorage.clear();

        /*This first if statement only executes on shop.js, and the 2nd if statement only
            executes on cart.js */
        if(typeof displayCart === "function"){
            displayCart();
        };
        if(typeof displayCartProducts === "function"){
            displayCartProducts();
            displayOrderSummary();
        };
    }, false);
};
clearCart();


function updateQuantity(){
    let quantityNumberInput = document.getElementsByClassName("quantityNumberInput");
    for(let i = 0; i < quantityNumberInput.length; i++){
        quantityNumberInput[i].addEventListener("change", (event) => {
            let quantityChanged = quantityNumberInput[i].value;
            if(quantityChanged > 5){
                quantityChanged = 5;
            }

            let itemToChange = cart.find((item) => item.id == event.target.id);
            itemToChange.quantity = +quantityChanged;

            /*Updates the local storage with what's currently in the cart. */
            localStorage.setItem('CART', JSON.stringify(cart));

            if(typeof displayOrderSummary === 'function'){
                displayOrderSummary();
            }
        }, false)
    }
}


$(document).ready(function(){
    let sidebarOrigin = $('main aside').offset();

    $(window).scroll(function(){
        let scrollPosition = $('html').scrollTop() + 8;
        $('main aside').toggleClass('sticky', sidebarOrigin.top < scrollPosition);
    })
})