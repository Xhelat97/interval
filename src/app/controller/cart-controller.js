import { products } from "../model/products.js";
import { cart } from "../model/cart.js";

export function addToCart(productName, amount) {
    const product = products.find((item) => item.productName === productName);

    if (!product) {
        console.log("Товар недоступен!");
        return;
    }

    if (amount > product.amount) {
        console.log("Недостаточно товара на складе!");
        return;
    }

    const productInCard = cart.find((item) => item.product === product);

    if (productInCard) {
        productInCard.amount += amount;
    } else {
        cart.push({ product, amount });
    }

    product.amount -= amount;

    console.log(`Товар "${productName}" добавлен в корзину.`);
}

export function calculateTotal() {
    let totalPrice = 0;
    cart.forEach((elem) => {
        const { product, amount } = elem;
        const currentPrice = (product.price - product.discount) * amount;

        totalPrice += currentPrice;
    });
    return totalPrice;
}

export function apply15Discount() {
    let totalAmount = 0;
    cart.forEach((elem) => {
        totalAmount += elem.amount;
    });
    if (totalAmount > 3) {
        const discount = calculateTotal() * 0.15;
        return discount;
    }

    return 0;
}
