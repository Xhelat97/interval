import { users } from "../model/users.js";
import { cart } from "../model/cart.js";
import { calculateTotal } from "./cart-controller.js";
import { apply15Discount } from "./cart-controller.js";
import { renderHeader } from "../view/data-view.js";
import { currentUser } from "../model/users.js";
import { changeUser } from "../model/users.js";
import { renderForm } from "../view/form-view.js";

export function checkUser() {
    if (currentUser) {
        renderHeader()
    } else {
        renderForm()
    }
}


export function registration(email, password, name) {
    const passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const account = users.find((user) => user.email === email);
    // const accountName = users.find((newName) => newName.userName === name)

    if (account) {
        console.log("Пользователь с таким email уже зарегистрирован");
        return;
    }

    if (!passReg.test(password)) {
        console.log(
            "Длина пароля должна быть не менее 8 и не более 32 символов,содержать только буквы и числа"
        );
        return;
    }
    if (!emailReg.test(email)) {
        console.log("email невалидный");
        return;
    }

    const userData = {
        userName: name,
        email: email,
        password: String(password),
        orderHistory: [],
    };

    users.push(userData);

    changeUser(userData)

    console.log(`Пользователь ${name} успешно зарегистрирован`);
}


export function authorization(email, password) {
    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        changeUser(user)
        console.log(`Пользователь ${user.userName}  авторизован`);
        return;
    } else {
        console.log("Не вверные учетные данные.");
    }
}

export function createOrder() {
    if (!currentUser) {
        console.log("Пользователь не авторизован.");
        return;
    }

    if (cart.length === 0) {
        console.log("Корзина пуста");
        return;
    }

    const totalPrice = calculateTotal();
    const discount15 = apply15Discount();
    const finalPrice = totalPrice - discount15;

    const order = {
        products: [...cart],
        totalPrice,
        discount15,
        finalPrice,
        date: new Date().toLocaleDateString(),
    };

    currentUser.orderHistory.push(order);

    console.log("Заказ создан");

    order.products.forEach((item) => {
        console.log(`${item.product.productName}: ${item.amount}шт.`);
    });

    console.log(`Общая стоимость: $${order.totalPrice}`);
    if (order.discount15 > 0) {
        console.log(`Скидка 15%: ${order.discount15}`);
    }
    console.log(`Итоговая стоимость: ${order.finalPrice}`);

    cart.length = 0;
}

export function getOrderHistory() {
    if (!currentUser) {
        console.log("Пользователь не авторизован");
        return;
    }

    const history = currentUser.orderHistory;

    console.log(`История заказов для пользователя ${currentUser.userName}:`);
    if (history.length === 0) {
        console.log("История заказов отсутствует");
    } else {
        history.forEach((order, index) => {
            console.log(`Заказ #${index + 1}`);
            console.log(`Дата: ${order.date}`);
            console.log("Товары:");
            order.products.forEach((item) => {
                console.log(`${item.product.productName}: ${item.amount}шт.`);
            });
            console.log(`Общая стоимость: $${order.totalPrice}`);
            if (order.discount15 > 0) {
                console.log(`Скидка 15%: ${order.discount15}`);
            }
            console.log(`Итоговая стоимость: ${order.finalPrice}`);
        });
    }
}

export function clearOrderHistory() {
    if (!currentUser) {
        console.log("Пользователь не авторизован");
        return;
    }
    currentUser.orderHistory.length = 0;
    console.log("История заказов очищена");
}
