import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase , ref, set , onValue , update , remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
/* INICIANDO Y CONFIGURANDO FIREBASE*/
const firebaseConfig = {
    apiKey: "AIzaSyCJJlwaKb3DJNvu2rYPxyNus0cdTn-l30A",
    authDomain: "crud-javascrit.firebaseapp.com",
    databaseURL: "https://crud-javascrit-default-rtdb.firebaseio.com",
    projectId: "crud-javascrit",
    storageBucket: "crud-javascrit.appspot.com",
    messagingSenderId: "909419132537",
    appId: "1:909419132537:web:c84eef7a12be706af986a8",
    measurementId: "G-1D6RXRTMTP"
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
let idStudent = parseInt(1);
/*FUNCION PARA MOSTRAR DATOS*/
window.addEventListener('DOMContentLoaded', async(e)=>{
  const starCountRef = await ref(AccesDB, 'students/');
  onValue(starCountRef, (snapshot) => {
    studentsTabla.innerHTML = ''
    const data = snapshot.val();
    data.forEach(element => {
      /*Checnado ID*/
      if(element.Id>idStudent){idStudent=parseInt(element.Id)}
      studentsTabla.innerHTML += '<tr>'+
      '<th>'+element.Id+'</th>'+
      '<td>'+element.Name+'</td>'+
      '<td>'+element.ApPaterno+'</td>'+
      '<td>'+element.ApMaterno+'</td>'+
      '<td>'+element.Telefono+'</td>'+
      '<td>'+element.Correo+'</td>'+
      '<td>'+
        '<div class="btn-operaciones">'+
          '<button class="button is-warning" data-id='+element.Id+' id="openUpdateModal">'+
            '<i class="fas fa-pencil-alt"></i>'+
          '</button>'+
          '<button class="button is-danger" data-id='+element.Id+' id="DeleteStudent">'+
            '<i class="fas fa-trash"></i>'+
          '</button>'+
        '</div>'+
      '</td>'+
      '</tr>'

      const updateButtons = document.querySelectorAll('.is-warning')
      updateButtons.forEach( (button)=>{
        button.addEventListener('click', (e)=>{
          const recuperarDatos = ref(AccesDB,'students/'+button.getAttribute('data-id'))
          onValue(recuperarDatos, (snapshot)=>{
            const datos = snapshot.val()
            UpdateForm['Id'].value=datos.Id
            UpdateForm['nombre'].value = datos.Name
            UpdateForm['apellido-paterno'].value = datos.ApPaterno
            UpdateForm['apellido-materno'].value = datos.ApMaterno
            UpdateForm['telefono'].value = datos.Telefono
            UpdateForm['correo'].value = datos.Correo
            UpdateForm['descripcion'].value = datos.Desc
            ShowUpdateModal()
          })
        })
      })
      const deleteButtons = document.querySelectorAll('.is-danger')
      deleteButtons.forEach( (button)=>{
        button.addEventListener('click', (e)=>{
          console.log("Entro a eliminar")
          console.log(button.getAttribute('data-id'))
          const recuperarDatos = ref(AccesDB,'students/'+button.getAttribute('data-id'))
          const deletes = {};
          deletes['students/'+button.getAttribute('data-id')+'/'] = null;
          update(ref(AccesDB), deletes);
        })
      })
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
/*MODIFICAR*/
//const openUdateModal = document.getElementById('openUpdateModal')
const modalUpdate = document.getElementById('Update-modal')
const closeUpdateModal = document.getElementById('closeUpdatemodal')
const UpdateForm = document.getElementById('update-form')

/*FUNCION DEL UPDATE MODAL*/
const ShowUpdateModal = ()=>{
  modalUpdate.classList.toggle('is-active')
}
/*FUNCION DE LOS UPDATE MODALES*/
//openUdateModal.addEventListener('click',showRegisterModal)
closeUpdateModal.addEventListener('click',ShowUpdateModal)

/*FUNCION PARA REGISTRAR ESTUDIANTES*/
registerForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const nombre = registerForm['nombre'].value
  const apellidoPaterno = registerForm['apellido-paterno'].value
  const apellidoMaterno = registerForm['apellido-materno'].value
  const teleono = registerForm['telefono'].value
  const correo = registerForm['correo'].value
  const descripcion = registerForm['descripcion'].value

  set(ref(AccesDB,'students/'+ (parseInt(idStudent)+parseInt(1))),{
    Id: (parseInt(idStudent)+parseInt(1)),
    Name: nombre,
    ApPaterno:apellidoPaterno,
    ApMaterno:apellidoMaterno,
    Telefono:teleono,
    Correo:correo,
    Desc:descripcion
  })
  showRegisterModal()

})

UpdateForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const Identificador = UpdateForm['Id'].value
  const nombre = UpdateForm['nombre'].value
  const apellidoPaterno = UpdateForm['apellido-paterno'].value
  const apellidoMaterno = UpdateForm['apellido-materno'].value
  const teleono = UpdateForm['telefono'].value
  const correo = UpdateForm['correo'].value
  const descripcion = UpdateForm['descripcion'].value

  const UpdateData={
    Id: Identificador,
    Name: nombre,
    ApPaterno:apellidoPaterno,
    ApMaterno:apellidoMaterno,
    Telefono:teleono,
    Correo:correo,
    Desc:descripcion
  }
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['students/'+Identificador+'/'] = UpdateData;

  console.log(updates)
  update(ref(AccesDB), updates);
  
  ShowUpdateModal()
  ShowUpdateModal()
})