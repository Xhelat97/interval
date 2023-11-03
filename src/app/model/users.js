import { renderHeader } from "../view/data-view.js";
import { checkUser } from "../controller/user-controller.js";

export let currentUser = null; // Проверять ls, если он не пустой присваивать данные из  него (??)

export const users = [
    {
        userName: "Alex",
        email: "alex@x.com",
        password: "qwerty",
        orderHistory: [],
    },
    {
        userName: "Ivan",
        email: "ivan@x.com",
        password: "1234",
        orderHistory: [],
    },
];

export function changeUser(user) {
  currentUser = user;
  checkUser()
}