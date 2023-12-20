const actualPage = "store";

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else ready();

// check if document is still loading -> wait for the DOMContentLoaded event; if is not -> call the ready f
function ready() {
  // get all elements with class "btn-danger", add a click event to each
  let removeItems = document.getElementsByClassName("btn-danger");
  console.log(removeItems);
  for (let i = 0; i < removeItems.length; i++) {
    let button = removeItems[i];
    button.addEventListener("click", removeCartItem);
  }
  // get all elements with class "cart-quantity-input", add a change event to each
  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
  }
  // get all elements with class "shop-item-btn", add a click event to each
  let addToCartBtn = document.getElementsByClassName("shop-item-btn")
  for (let i = 0; i < addToCartBtn.length; i++) {
    let button = addToCartBtn[i]
    button.addEventListener("click", addToCartClicked)
  }
  // add a click event listener to the element with class "btn-purchase"
  document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
}

//  handle a purchase event
function purchaseClicked(){
    console.log("click")
    alert("Thank you for your purchase!")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}

// remove an item from the cart
function removeCartItem(event){
    console.log("click");
    let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      updateTotal();
}

// handle changes in quantity input
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

// handle adding items to the cart
function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let imgSrc = shopItem.getElementsByClassName("shop-item-img")[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
    updateTotal()
}

// check if the item is already in the cart -> show an alert
function addItemToCart(title, price, imgSrc){
    let cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    // cartRow.innerText = title
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (let i=0; i< cartItemNames.length; i++){
        if(cartItemNames[i]. innerText == title){
            alert("This item is already added to the cart")
            return;
        }
    }

    // create HTML content for the new cart, append it to the cart items
    let cartRowContent = `      <div class="cart-item cart-column">
    <img class="cart-item-img"
      width="100"
      height="100"
      src="${imgSrc}"/>
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" role="button">REMOVE</button>
  </div>`
  cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow)

    // add events for remove and quantity change
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}

// update the total price of items in the cart
function updateTotal() {
  let cartItem = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItem.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElem = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElem = cartRow.getElementsByClassName("cart-quantity-input")[0];
    console.log(priceElem, quantityElem);
    let price = parseFloat(priceElem.innerText.replace("$", ""));
    console.log(price);
    let quantity = quantityElem.value;
    console.log(price * quantity);
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
