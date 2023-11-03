import { currentUser } from "../model/users.js";

export function renderHeader() {
  root.innerHTML = `<header>
                             <h1>${currentUser.userName}</h1>
                             <p>${currentUser.email}</p>
                         </header>`;
}