import { root } from "../script.js";
import { authorization } from "../controller/user-controller.js";
import { formHandler } from "../controller/form-controller.js";

export function renderForm() {
  root.innerHTML = `
                         <form id="form">
                             <input name="email" placeholder="example@mail.ru" id="email" type="email" />
                             <input name="pass" placeholder="password" id="pass" type="password" />
                             <button id="submit">Login</button>
                         </form>
                         `;

  const fromNode = root.querySelector('#form')
  const submitter = root.querySelector('#submit')
  const emailNode = root.querySelector("#email")
  const passNode = root.querySelector("#pass")

  fromNode.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailValue = emailNode.value
    const passValue = passNode.value
    formHandler(emailValue, passValue)
  })
}