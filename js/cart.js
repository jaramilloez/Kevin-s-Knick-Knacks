const cardCartContainer = document.querySelector("#cartCartContainer");

function displayCartProducts(){
    clearStorageAndCart();
    cardCartContainer.innerHTML = "";

    if(cart.length > 0){
        cart.forEach(cartItem => {
            cardCartContainer.innerHTML += `
                <div class="cartCard">
                    <div class="cartCardFlex">
                        <img src="${cartItem.image}" alt="${cartItem.description}">
                        <p class="cartTitle">${cartItem.name}</p>
                        <p class="cartDescription">${cartItem.description}</p>
                        <div class="cartQuantity">
                            <input type="number" value="${cartItem.quantity}" min="1" max="5">
                        </div>
                        <p class="cartPrice">&dollar; ${cartItem.price}</p>
                    </div>
                    <p class="textAlignRight removeMargins"><a href="#" id="${cartItem.id}" class="removeLink">Remove</a></p>
                </div>
            `;
            removeFromCart();
        });
    }
    else{
        cardCartContainer.innerHTML = '<p id="emptyCart">The cart is empty</p>s';
    }
}
displayCartProducts();