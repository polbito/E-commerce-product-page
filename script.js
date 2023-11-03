const menu_icon = document.getElementById("menu_icon");
let first_click = true;
menu_icon.addEventListener("click",function(){
    const nav = document.querySelector(".nav");
    if (first_click){
        nav.style.marginLeft = "0";
        first_click = !first_click;
    }else {
        nav.style.marginLeft = "-99em";
        first_click = !first_click;
    }
})

////////////////////

const all_product_images = document.querySelectorAll(".thumbnails img");
// const active_product_image = document.querySelector(".active-image img");
const active_product_image = document.getElementById("active_image_product");

const product_images = ["image-product-1.jpg","image-product-2.jpg","image-product-3.jpg","image-product-4.jpg"];
function setImage(text) {
    return product_images.filter(item => item.includes(text))
}

all_product_images.forEach(function(v){
    v.addEventListener("click",function(){
        let text = ((v.src).split("/"))[4];
        text = text.split("-")[2]
        active_product_image.src = `/images/${setImage(text)}`;        
    })
})

const product_gallery = document.querySelector(".product-gallery");
const current_image = document.getElementById("current_image");
const product_images_thumbnail = ["image-product-1-thumbnail.jpg","image-product-2-thumbnail.jpg","image-product-3-thumbnail.jpg","image-product-4-thumbnail.jpg"];



active_product_image.addEventListener("click",function(){
    if (window.innerWidth > 600) {
        product_gallery.style.cssText = `
        display: flex;
        position: fixed;
        left: 50%;
        top: 50%;
        width: 22%;
        transform: translate(-50%, -50%);
        z-index: 999;
        width: 100%;
        height: 100%;
        background: hsl(223deg 64% 98% / 70%);
        
        `
        current_image.src = active_product_image.src;
        current_image.style.cssText = `
        border-radius: 10px;
        width: 485px;
        position: absolute;
        left: 49.6%;
        top: 47%;
        margin-top: -1.5em;
        transform: translate(-50%, -50%);
        `
        const product_images_gallery = document.querySelector(".product-gallery div:last-child");
        product_images_gallery.style.width = "450px";
        const product_images_gallery_images = document.querySelectorAll(".product-gallery div:last-child img");
        product_images_gallery.style.cssText = "position: absolute;top: 670px;";
        product_images_gallery_images.forEach(function(v,k){
            v.style.cssText = "width: 105px;margin-right: 1.05em;border-radius: 10px;cursor:pointer;";
            v.src = `/images/${product_images_thumbnail[k]}`;  
        })
    }
})

const product_images_gallery_thumbnails = document.querySelectorAll(".product-gallery div:last-child img");

product_images_gallery_thumbnails.forEach(function(v){
    v.addEventListener("click",function(){
        console.log(v.src)
        let text = v.src.split("/").at(-1).split("-").at(-2);
        current_image.src = `/images/${setImage(text)}`;
    })
})

let next_n =0
let previous_n =0

const next_icon = document.getElementById("next");
next_icon.addEventListener("click",function(){
    if (next_n<3) {
        current_image.src = `/images/${product_images[++next_n]}`; 
        ++previous_n
    }
})

const previous_icon = document.getElementById("previous");
previous_icon.addEventListener("click",function(){
    if (previous_n > 0) {
        current_image.src = `/images/${product_images[--previous_n]}`;
        --next_n;
    }
})

const close_icon = document.getElementById("close");
close_icon.addEventListener("click",function(){
    product_gallery.style.display = "none";
})

////////////////////

const minus = document.getElementById("minus")
const plus = document.getElementById("plus")
const n_items = document.getElementById("n-items");
n_items.innerText = 2;
localStorage.setItem("n-items",n_items.innerText);

plus.addEventListener("click",function(){
    n_items.innerText = parseInt(n_items.innerText) + 1;
    localStorage.setItem("n-items",n_items.innerText);
})
minus.addEventListener("click",function(){
    if (parseInt(n_items.innerText) > 0) {
        n_items.innerText = parseInt(n_items.innerText) - 1;
        localStorage.setItem("n-items",n_items.innerText)
    }
})

///////////////////////

const cart_icon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const cart_content = document.querySelector(".cart .bottom");
let first_click_profile = true;
cart_icon.addEventListener("click",function(){
    if (first_click_profile) {
        cart.style.display = "block";
        if (localStorage.getItem("n-items") === "0"){
            document.querySelector(".cart_empty").style.cssText = "display:block;padding-top: 4em;"
        }
        first_click_profile = !first_click_profile;
    }else {
        cart.style.display = "none";
        first_click_profile = !first_click_profile;
    }
})

const add_to_card = document.getElementById("add-to-cart");
let first_click_add_to_card = true
add_to_card.addEventListener("click",function(){
    
    let n = document.getElementById("n-items").innerText;
    let n_items_added = document.getElementById("n-items-added");
    if (n>0) {
        n_items_added.style.display = "block";
        n_items_added.innerText = n;
    }else {
        n_items_added.style.display = "none";
    }

    if (first_click_add_to_card === false){
        if (document.querySelector(".cart-content") && document.querySelector(".checkout-button")) {
            document.querySelector(".cart-content").remove();
            document.querySelector(".checkout-button").remove();
        }
        first_click_add_to_card = !first_click_add_to_card;
    }
    first_click_add_to_card = !first_click_add_to_card;

    let n_items = localStorage.getItem("n-items");
    if (n_items === "0"){
        document.querySelector(".cart_empty").style.cssText = "display:block;padding-top: 4em;"
    }else{
        document.querySelector(".cart_empty").style.display = "none";
        let cart_content = document.createElement("div");
        cart_content.className = "cart-content";

        let cart_content__div = document.createElement("div");
        cart_content.append(cart_content__div);
        let img_product = document.createElement("img");
        img_product.src = "images/image-product-1-thumbnail.jpg";
        img_product.alt = "product image";
        cart_content__div.append(img_product);

        let cart_product_description = document.createElement("div");
        cart_product_description.className = "cart-product-description";
        cart_content.append(cart_product_description);
        let cart_product_description__p1 = document.createElement("p");
        cart_product_description__p1.innerText = "Fall Limited Edition Sneakers";
        cart_product_description.append(cart_product_description__p1);
        let cart_product_description__p2 = document.createElement("p");
        cart_product_description__p2.innerHTML = '$125.00 x <span class="n-of-items">X</span> <span class="total-price">$X</span>';
        cart_product_description.append(cart_product_description__p2);

        let delete_icon = document.createElement("div");
        delete_icon.className = "delete-icon";
        cart_content.append(delete_icon);
        let delete_image = document.createElement("img");
        delete_image.src = "images/icon-delete.svg";
        delete_image.alt = "icon delete";
        delete_icon.append(delete_image);

        let checkout_button = document.createElement("button");
        checkout_button.className = "checkout-button";
        checkout_button.innerText = "Checkout";

        document.querySelector(".bottom").append(cart_content)
        document.querySelector(".bottom").append(checkout_button)

        document.querySelector(".n-of-items").innerText = n_items;
        document.querySelector(".total-price").innerText = `$${n_items * 125}.00`;

        let delete_product = document.querySelector(".delete-icon img");
        delete_product.addEventListener("click",function(){
            console.log('delete');
            document.querySelector(".cart-content").remove();
            document.querySelector(".checkout-button").remove();
        })
    }
})

///////////   Mobile   ////////////


const pre = document.querySelector(".controllers__mobile__prev");
const next = document.querySelector(".controllers__mobile__next");

let next_n_ =0;
let previous_n_ =0;


pre.addEventListener("click",function(){
    if (previous_n_ > 0) {
        document.getElementById("active_image_product").src = `/images/${product_images[--previous_n_]}`;
        --next_n_;
    }
})
next.addEventListener("click",function(){if (window.innerWidth < 600) {
    document.querySelector(".product-description-paragraph").innerHTML = "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, theyll withstand everything the weather can offer.";
}
    if (next_n_<3) {
        document.getElementById("active_image_product").src = `/images/${product_images[++next_n_]}`; 
        ++previous_n_
    }
})
