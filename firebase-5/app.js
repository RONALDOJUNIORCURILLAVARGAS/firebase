$(document).ready(function() {
    //Chicos acá debemos poner la configuración de FIREBASE
    const config = {
        apiKey: "AIzaSyAcZ-p5lFMCT-vfpgWvdQN4HGYSMAKgvxI",
        authDomain: "unfv-mentoria-d9726.firebaseapp.com",
        databaseURL: "https://unfv-mentoria-d9726-default-rtdb.firebaseio.com",
        projectId: "unfv-mentoria-d9726",
        storageBucket: "unfv-mentoria-d9726.appspot.com",
        messagingSenderId: "238854800770",
        appId: "1:238854800770:web:bf0a14a876aebb948cbb9b",
        measurementId: "G-FM15JL1F2G"
      };
      
    // Initialize Firebase
    firebase.initializeApp(config);

    //Para capturar la fila eliminada
    var filaEliminada;
    //Para capturar la fila editada o actualizada
    var filaEditada;
    
    //Creamos constantes para los iconos de editar y borrar
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
    
    //Hacemos referencia a la base de datos Realtime Database de Firebase
    var db = firebase.database();

    //Creamos la tabla no relacion de Productos en la base de datos
    var coleccionProductos = db.ref().child("productos");

    //Creamos un array para guardar los valores de los campos inputs del index.html
    var dataSet = [];
    
    //Creamos la tabla de DataTable
    var table = $('#tablaProductos').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        columnDefs: [
            {
                targets: [0],
                visible: false, //Ocultamos la columna de ID que es la posición 0 del arreglo [0]
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
            }

        ]
    });

    //Agregamos los listener de Firebase del CRUD

    /* 
        CREATE(CREAR): CREAR PRODUCTOS
        READ(LEER): LEER PRODUCTOS
        UPDATE(ACTUALIZAR): ACTUALIZAR PRODUCTOS
        DELETE(ELIMINAR): ELIMINARP PRODUCTOS

    */

    /**************************************************** CREAR PRODUCTOS ***********************************************/

    //Llamamos a la coleccion de Productos
    coleccionProductos.on("child_added", datos => {
        //Ahora le pasamos el dataSet de nuestra coleccion
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("descripcion").val(), datos.child("cantidad").val()];
        //Añadimos la información agregada en la tabla de DataTable
        table.rows.add([dataSet]).draw();
    });

    /**************************************************** ACTUALIZAR PRODUCTOS ***********************************************/

    //Llamamos a la colección de Productos
    coleccionProductos.on("child_changed", datos => {
        //Ahora le pasamos el dataSet de nuestra coleccion
        dataSet = [datos.key, datos.child("codigo").val(), datos.child("descripcion").val(), datos.child("cantidad").val()];
        //Actualizamos la información en la tabla de DataTable
        table.row(filaEditada).data(dataSet).draw();
    });

    /**************************************************** ELIMINAR PRODUCTOS *************************************************/

    //Llamamos a la colección de Productos
    coleccionProductos.on("child_removed", function() {
        //Borrar la información en la tabla de DataTable
        table.row(filaEliminada.parents('tr')).remove().draw();
    });

    //Cuando enviemos la información del Submit del formulario
    $('form').submit(function(e) {
        e.preventDefault();
        let id = $.trim($('#id').val());
        let codigo = $.trim($('#codigo').val());
        let descripcion = $.trim($('#descripcion').val());
        let cantidad = $.trim($('#cantidad').val());
        let idFirebase = id;
        if(idFirebase == ''){
            idFirebase = coleccionProductos.push().key;
        };
        data = {codigo:codigo, descripcion:descripcion, cantidad:cantidad};
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProductos.update(actualizacionData);
        id = '';
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Limpiamos las cajas de texto cuando hacemos click en el botón NUEVO
    $('#btnNuevo').click(function() {
        $('#id').val('');
        $('#codigo').val('');
        $('#descripcion').val('');
        $('#cantidad').val('');
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });

    //Le damos la funcion Editar al botón btnEditar
    $("#tablaProductos").on("click", ".btnEditar", function() {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);
        let codigo = $(this).closest('tr').find('td:eq(0)').text();
        let descripcion = $(this).closest('tr').find('td:eq(1)').text();
        let cantidad = parseInt($(this).closest('tr').find('td:eq(2)').text());
        $('#id').val(id);
        $('#codigo').val(codigo);
        $('#descripcion').val(descripcion);
        $('#cantidad').val(cantidad);
        $('#modalAltaEdicion').modal('show');
    });

    //Le damos la funcion Borrar al botón btnBorrar
    $("#tablaProductos").on("click", ".btnBorrar", function() {
        filaEliminada = $(this);
        Swal.fire({
            title: '¿Estás seguro de eliminar el producto?',
            text: '¿Está operación no se puede revertir!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if(result.value) {
                let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));
                let id = fila[0];
                db.ref(`productos/${id}`).remove()
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success')
            }
        })
    });

});