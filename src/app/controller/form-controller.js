import { authorization } from "./user-controller.js"

export function formHandler(email, pass) {
  
  authorization(email, pass)
}