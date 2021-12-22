
//Configuracion de firebase cloud
const firebaseConfig = {
    apiKey: "AIzaSyAcZ-p5lFMCT-vfpgWvdQN4HGYSMAKgvxI",
    authDomain: "unfv-mentoria-d9726.firebaseapp.com",
    projectId: "unfv-mentoria-d9726",
    storageBucket: "unfv-mentoria-d9726.appspot.com",
    messagingSenderId: "238854800770",
    appId: "1:238854800770:web:bf0a14a876aebb948cbb9b",
    measurementId: "G-FM15JL1F2G"
  };
  
  // Inicializamos Firebase en nuestro proyecto
firebase.initializeApp(firebaseConfig);

  //Inicializar Cloud Firestore de Firebase
var db= firebase.firestore();

  //Create (crear documento)
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var correo = document.getElementById('correo').value;
    

    db.collection("Usuarios").add({
          nombres: nombre,
          apellidos: apellido,
          correos:correo
    })
    .then(function(docRef){
        console.log("El documento se ha creado correctamente y su id es ",docRef.id);
        Limpiar();
     }).catch(function(error) {
        console.error("Hay un error al momento crear ",error);
    });
    

  }
  //READ (leer documento)
  function leer() {
      var tabla=document.getElementById("tabla");

      db.collection("Usuarios").onSnapshot((querySnapshot)=> {

        tabla.innerHTML ='';
        //Arreglar ,lo de snapshot no se recibe nombre apellido
        querySnapshot.forEach((doc)=>{
            console.log(`${doc.id} => ${doc.data().nombres}=> ${doc.data().apellidos} => ${doc.data().correos}`);
            tabla.innerHTML += `
            <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().nombres}</td>
            <td>${doc.data().apellidos}</td>
            <td>${doc.data().correos}</td>
            <td><button type="button" class="btn btn-outline-warning" onclick="Actualizar('${doc.id}','${doc.data().nombres}','${doc.data().apellidos}','${doc.data().correos}')">Editar</button> </td>
            <td><button type="button" class="btn btn-outline-danger" onclick="Eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
            `;
        })
      })
  }

  leer();

  //FUNCION DE ACTUALIZAR DESARROLLADA POR MI

  function Actualizar(id,nombre,apellido,correo) {
    var nombres = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellido').value;
    var correos = document.getElementById('correo').value;
    db.collection("Usuarios").doc(id).update({
      nombres: nombres,
      apellidos: apellidos,
      correos:correos
    }).then(function(ids=id) {
      console.log("El documento se edito correctamente !",ids);
      Limpiar();
    }).catch(function(error) {
      console.error("Error al actualizar el documento",error);
    });

  }

  //------------------------------------------------------------------
  function Eliminar(id) {
    db.collection("Usuarios").doc(id).delete()
    .then(function(){
      console.log("El documento se ha borrado correctamente!");
      
    }).catch(function(error) {
      console.error("Error al eliminar el documento : ",error);
    });
  }

  function Limpiar(){

    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('correo').value = '';

}
/*TAREA COMPLETAR EL CODIGO */