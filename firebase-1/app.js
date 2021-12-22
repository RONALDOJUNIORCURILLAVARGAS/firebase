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

  //const analytics = getAnalytics(app);

  let btn=document.querySelector("button");

  btn.addEventListener('click',(e)=>{
    //Capturando metadatis a traves del evento   
    let input =  document.querySelector("input").files[0];

    const storage = firebase.storage().ref('imagenes/'+ input.name);
    const task = storage.put(input);

    task.on('state_change',
        function progress(snap) {
            console.log(snap.bytesTransferred / snap.totalBytes *100);
        },
        function error(error) {
            console.log(error.message);
        },
        function complete() {
            storage.getDownloadURL().then(function (url) {
                let body= document.querySelector("body");
                body.innerHTML +=  `<img src="${url}" alt="">`;

                console.warn(url);

            }).catch(function (error) {
                switch(error.code) {
                    case 'storage/object-bot-fund':
                        console.log("El archivo no existe");
                        break;
                    case 'storage/unauthorized':
                        console.error("Usted no tiene permisos para acceder al servicio");
                        break;
                    case 'storage/canceled':
                        console.error("Usted cancelo la subida de la imagen");
                        break;
                    case 'storage/unknown':
                        console.error("Ha ocurrido un error desconocido");
                        break;
                }
            })
        }
    )
  })