import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJJlwaKb3DJNvu2rYPxyNus0cdTn-l30A",
  authDomain: "crud-javascrit.firebaseapp.com",
  databaseURL: "https://crud-javascrit-default-rtdb.firebaseio.com",
  projectId: "crud-javascrit",
  storageBucket: "crud-javascrit.appspot.com",
  messagingSenderId: "909419132537",
  appId: "1:909419132537:web:57bc741dc14954fbf986a8",
  measurementId: "G-SGQP7B3XEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('close-modal')
const registerForm = document.getElementById('register-form')

showRegisterModal = ()=>{
    modal.classList.toggle('is-active')
}

openModal.addEventListener('click',showRegisterModal)
closeModal.addEventListener('click',showRegisterModal)

registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const nombre = registerForm['nombre'].value
    const apellidoPaterno = registerForm['apellido-paterno'].value
    const apellidoMaterno = registerForm['apellido-materno'].value
    const teleono = registerForm['telefono'].value
    const correo = registerForm['correo'].value
    const descripcion = registerForm['descripcion'].value

    app.database
})