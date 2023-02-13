import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase , ref, set , onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
/* INICIANDO Y CONFIGURANDO FIREBASE*/
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
const app = initializeApp(firebaseConfig);
const AccesDB = getDatabase(app);
/*VARIABLES PARA ABRIR/CERRAR EL MODAL*/
const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('close-modal')
const registerForm = document.getElementById('register-form')
/*ID DE LA TABLA*/
const studentsTabla = document.getElementById('CuerpoTabla')
/*VARIABLE PARA ID DE ESTUDIANTES*/
let idStudent = 0;
/*FUNCION PARA MOSTRAR DATOS*/
window.addEventListener('DOMContentLoaded', async(e)=>{
  const starCountRef = await ref(AccesDB, 'students/');
  onValue(starCountRef, (snapshot) => {
    studentsTabla.innerHTML = ''
    const data = snapshot.val();
    data.forEach(element => {
      /*Checnado ID*/
      if(element.Id>idStudent){idStudent=element.Id}
      studentsTabla.innerHTML += '<tr>'+
      '<th>1</th>'+
      '<td>'+element.Name+'</td>'+
      '<td>'+element.ApPaterno+'</td>'+
      '<td>'+element.ApMaterno+'</td>'+
      '<td>'+element.Telefono+'</td>'+
      '<td>'+element.Correo+'</td>'+
      '<td>'+
        '<div class="btn-operaciones">'+
          '<button class="button is-warning" data-id='+'>'+
            '<i class="fas fa-pencil-alt"></i>'+
          '</button>'+
          '<button class="button is-danger">'+
            '<i class="fas fa-trash"></i>'+
          '</button>'+
        '</div>'+
      '</td>'+
      '</tr>'
    })
  })
})
/*FUNCION DEL MODAL*/
const showRegisterModal = ()=>{
  modal.classList.toggle('is-active')
}
/*fUNCION DE LOS MODALES*/
openModal.addEventListener('click',showRegisterModal)
closeModal.addEventListener('click',showRegisterModal)

/*FUNCION PARA REGISTRAR ESTUDIANTES*/
registerForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const nombre = registerForm['nombre'].value
  const apellidoPaterno = registerForm['apellido-paterno'].value
  const apellidoMaterno = registerForm['apellido-materno'].value
  const teleono = registerForm['telefono'].value
  const correo = registerForm['correo'].value
  const descripcion = registerForm['descripcion'].value

  set(ref(AccesDB,'students/'+ (idStudent+1)),{
    Id:idStudent,
    Name: nombre,
    ApPaterno:apellidoPaterno,
    ApMaterno:apellidoMaterno,
    Telefono:teleono,
    Correo:correo,
    Desc:descripcion
  })
  showRegisterModal()

})

