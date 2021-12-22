const firebaseConfig = {
    apiKey: "AIzaSyAcZ-p5lFMCT-vfpgWvdQN4HGYSMAKgvxI",
    authDomain: "unfv-mentoria-d9726.firebaseapp.com",
    projectId: "unfv-mentoria-d9726",
    storageBucket: "unfv-mentoria-d9726.appspot.com",
    messagingSenderId: "238854800770",
    appId: "1:238854800770:web:bf0a14a876aebb948cbb9b",
    measurementId: "G-FM15JL1F2G"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //Crear las variables
  var login_btn = document.getElementById("login_btn");
  var logout_btn= document.getElementById("logout_btn");
  var user_name= document.getElementById("user_name");
  var user_image=document.getElementById("user_image");
  //Iniciar con Google
  var loginWithGoogle= function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function (result) {
          //Creamos una variable token para el acceso a la autenticacion de Google
          var token = result.credential.accessToken;
          //Creamos una variable user para obtener el resultado del usuario
          var user = result.user;
          //Imprimimos el nombre del ususario de Google
          console.log(user.displayName);
          //Informacion del Usuario
          updateUser(user);

      }).catch(function (error) {
          //Manejo de excepcciones
          var errorCode = error.code;
          var errorMessage = error.message;
          //El email del ususario que ha iniciado sesion hay un error
          var email = error.email;
          //Llamamos a las credenciales que hemos usado
          var credential= error.credential;
          //Imprimimos el errorr
          console.log(errorMessage);
      });
  }
//Funcion cuando se accede a la cuenta
  var updateUser = function (user) {
      user_name.innerHTML = "Hola, "+ user.displayName;
      user_image.style.display="inline-block"
      user_image.src= user.photoURL;
      login_btn.style.display = "none";
      logout_btn.style.display="inline-block";

  }
//Funcion cuando se sale de la cuenta
  var logout = function () {
      firebase.auth().signOut()
      .then(function () {
          console.log("Se ha cerrado la sesión");
          user_name.innerHTML = "Acceso";
          user_image.src= null;
          login_btn.style.display = "inline-block";
          logout_btn.style.display="none";
          user_image.style.display="none";  

      }).catch(function (error) {
          console.log("Error al cerrar sesión",error);
      });
  }
