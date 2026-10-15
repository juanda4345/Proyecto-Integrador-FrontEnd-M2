var notasIniciales = [
  { id: 1, estudiante: "Santiago Gómez", materia: "Frontend", nota1: 4.3, nota2: 4.5, nota3: 4.4 },
  { id: 2, estudiante: "Valentina Rodríguez", materia: "Backend", nota1: 4.6, nota2: 4.4, nota3: 4.8 },
  { id: 3, estudiante: "Mateo Fernández", materia: "Lógica de programación", nota1: 2.8, nota2: 3.0, nota3: 2.9 },
  { id: 4, estudiante: "Sofía Martínez", materia: "Metodologías ágiles", nota1: 3.9, nota2: 4.1, nota3: 4.0 },
  { id: 5, estudiante: "Lucas Pérez", materia: "Base de datos", nota1: 2.5, nota2: 2.7, nota3: 2.8 },
  { id: 6, estudiante: "Isabella Silva", materia: "Base de datos", nota1: 4.4, nota2: 4.6, nota3: 4.5 },
  { id: 7, estudiante: "Thiago Díaz", materia: "Frontend", nota1: 3.6, nota2: 3.8, nota3: 3.5 },
  { id: 8, estudiante: "Camila Castro", materia: "Backend", nota1: 4.8, nota2: 4.9, nota3: 4.6 }
];

var notas = notasIniciales;
var intentos = 0;

function calcularPromedio(nota) {
  var suma = nota.nota1 + nota.nota2 + nota.nota3;
  return suma / 3;
}

function estaAprobado(nota) {
  if (calcularPromedio(nota) >= 3.0) {
    return true;
  }

  return false;
}

function crearCelda(fila, texto) {
  var celda = document.createElement("td");
  celda.textContent = texto;
  fila.appendChild(celda);
}

function actualizarResumen() {
  var cantidadAprobados = 0;
  var sumaPromedios = 0;

  for (var i = 0; i < notas.length; i++) {
    var promedio = calcularPromedio(notas[i]);
    sumaPromedios = sumaPromedios + promedio;

    if (estaAprobado(notas[i])) {
      cantidadAprobados = cantidadAprobados + 1;
    }
  }

  var promedioGeneral = 0;

  if (notas.length > 0) {
    promedioGeneral = sumaPromedios / notas.length;
  }

  document.getElementById("totalEstudiantes").textContent = notas.length;
  document.getElementById("promedioGeneral").textContent =
    promedioGeneral.toFixed(1);
  document.getElementById("totalAprobados").textContent = cantidadAprobados;
}

function mostrarNotas() {
  var cuerpoTabla = document.getElementById("tablaNotas");
  var textoBusqueda = document.getElementById("busqueda").value.toLowerCase();
  var cantidadResultados = 0;

  cuerpoTabla.innerHTML = "";

  for (var i = 0; i < notas.length; i++) {
    var nombre = notas[i].estudiante.toLowerCase();
    var materia = notas[i].materia.toLowerCase();
    var coincide = nombre.indexOf(textoBusqueda) >= 0 ||
      materia.indexOf(textoBusqueda) >= 0;

    if (coincide) {
      cantidadResultados = cantidadResultados + 1;

      var fila = document.createElement("tr");
      crearCelda(fila, cantidadResultados);
      crearCelda(fila, notas[i].estudiante);
      crearCelda(fila, notas[i].materia);
      crearCelda(fila, notas[i].nota1.toFixed(1));
      crearCelda(fila, notas[i].nota2.toFixed(1));
      crearCelda(fila, notas[i].nota3.toFixed(1));
      crearCelda(fila, calcularPromedio(notas[i]).toFixed(1));

      var estado = "Reprobado";

      if (estaAprobado(notas[i])) {
        estado = "Aprobado";
      }

      crearCelda(fila, estado);

      var celdaAcciones = document.createElement("td");

      var botonEditar = document.createElement("button");
      botonEditar.type = "button";
      botonEditar.textContent = "Editar";
      botonEditar.className = "boton-editar";
      botonEditar.setAttribute("data-id", notas[i].id);
      botonEditar.addEventListener("click", editarNota);

      var botonEliminar = document.createElement("button");
      botonEliminar.type = "button";
      botonEliminar.textContent = "Eliminar";
      botonEliminar.className = "boton-eliminar";
      botonEliminar.setAttribute("data-id", notas[i].id);
      botonEliminar.addEventListener("click", eliminarNota);

      celdaAcciones.appendChild(botonEditar);
      celdaAcciones.appendChild(botonEliminar);
      fila.appendChild(celdaAcciones);
      cuerpoTabla.appendChild(fila);
    }
  }

  document.getElementById("cantidadResultados").textContent =
    cantidadResultados + " estudiantes";

  if (cantidadResultados === 0) {
    document.getElementById("sinResultados").classList.remove("oculto");
  } else {
    document.getElementById("sinResultados").classList.add("oculto");
  }
}

function mostrarNotasRecientes() {
  var cuerpoTabla = document.getElementById("tablaRecientes");
  cuerpoTabla.innerHTML = "";

  for (var i = 0; i < notas.length && i < 4; i++) {
    var fila = document.createElement("tr");
    crearCelda(fila, notas[i].estudiante);
    crearCelda(fila, notas[i].materia);
    crearCelda(fila, calcularPromedio(notas[i]).toFixed(1));

    var estado = "Reprobado";

    if (estaAprobado(notas[i])) {
      estado = "Aprobado";
    }

    crearCelda(fila, estado);
    cuerpoTabla.appendChild(fila);
  }
}

function actualizarPagina() {
  mostrarNotas();
  mostrarNotasRecientes();
  actualizarResumen();
}

function limpiarFormulario() {
  document.getElementById("formularioNota").reset();
  document.getElementById("idNota").value = "";
  document.getElementById("tituloFormulario").textContent = "Registrar nota";
  document.getElementById("botonGuardar").textContent = "Guardar nota";
  document.getElementById("botonCancelar").classList.add("oculto");
  document.getElementById("mensajeNota").textContent = "";
}

function editarNota(evento) {
  var idBuscado = Number(evento.currentTarget.getAttribute("data-id"));

  for (var i = 0; i < notas.length; i++) {
    if (notas[i].id === idBuscado) {
      document.getElementById("idNota").value = notas[i].id;
      document.getElementById("estudiante").value = notas[i].estudiante;
      document.getElementById("materia").value = notas[i].materia;
      document.getElementById("nota1").value = notas[i].nota1;
      document.getElementById("nota2").value = notas[i].nota2;
      document.getElementById("nota3").value = notas[i].nota3;

      document.getElementById("tituloFormulario").textContent = "Editar nota";
      document.getElementById("botonGuardar").textContent = "Actualizar nota";
      document.getElementById("botonCancelar").classList.remove("oculto");
    }
  }
}

function eliminarNota(evento) {
  let idBuscado = Number(evento.currentTarget.getAttribute("data-id"));
  let confirmar = confirm("¿Deseas eliminar este registro?");

  if (confirmar) {
    let listaActualizada = [];

    for (let i = 0; i < notas.length; i++) {
      if (notas[i].id !== idBuscado) {
        listaActualizada.push(notas[i]);
      }
    }

    notas = listaActualizada;
    actualizarPagina();
  }
}

document.getElementById("formularioNota").addEventListener("submit", function (evento) {
  evento.preventDefault();

  let idActual = document.getElementById("idNota").value;
  let nombreEstudiante = document.getElementById("estudiante").value.trim();
  let nombreMateria = document.getElementById("materia").value.trim();
  let nota1 = Number(document.getElementById("nota1").value);
  let nota2 = Number(document.getElementById("nota2").value);
  let nota3 = Number(document.getElementById("nota3").value);

  if (nota1 < 1 || nota1 > 5 ||
      nota2 < 1 || nota2 > 5 ||
      nota3 < 1 || nota3 > 5) {
    document.getElementById("mensajeNota").textContent =
      "Cada nota debe estar entre 1.0 y 5.0.";
    return;
  }

  let notaNueva = {
    id: Number(idActual),
    estudiante: nombreEstudiante,
    materia: nombreMateria,
    nota1: nota1,
    nota2: nota2,
    nota3: nota3
  };

  if (idActual === "") {
    notaNueva.id = new Date().getTime();
    notas.push(notaNueva);
  } else {
    for (let i = 0; i < notas.length; i++) {
      if (notas[i].id === Number(idActual)) {
        notas[i] = notaNueva;
      }
    }
  }

  limpiarFormulario();
  actualizarPagina();
});

document.getElementById("botonCancelar").addEventListener("click", limpiarFormulario);

document.getElementById("formularioLogin").addEventListener("submit", function (evento) {
  evento.preventDefault();

  let usuario = document.getElementById("usuario").value;
  let contrasena = document.getElementById("contrasena").value;

  if (usuario === "admin" && contrasena === "1234") {
    document.getElementById("pantallaLogin").classList.add("oculto");
    document.getElementById("aplicacion").classList.remove("oculto");
    document.getElementById("nombreUsuario").textContent = usuario;
    document.getElementById("saludoUsuario").textContent = usuario;
    document.getElementById("mensajeLogin").textContent = "";
    actualizarPagina();
  } else {
    intentos = intentos + 1;

    if (intentos >= 3) {
      document.getElementById("mensajeLogin").textContent =
        "Acceso bloqueado. Se alcanzaron tres intentos.";
      document.querySelector("#formularioLogin button").disabled = true;
    } else {
      document.getElementById("mensajeLogin").textContent =
        "Datos incorrectos. Intento " + intentos + " de 3.";
    }
  }
});

function cambiarPagina(evento) {
  let nombrePagina = evento.currentTarget.getAttribute("data-pagina");
  let paginas = document.getElementsByClassName("pagina");

  for (let i = 0; i < paginas.length; i++) {
    paginas[i].classList.add("oculto");
  }

  let idPagina = "pagina" + nombrePagina.charAt(0).toUpperCase() +
    nombrePagina.slice(1);
  document.getElementById(idPagina).classList.remove("oculto");

  let botonesMenu = document.getElementsByClassName("boton-menu");

  for (let j = 0; j < botonesMenu.length; j++) {
    botonesMenu[j].classList.remove("activo");
  }

  if (evento.currentTarget.classList.contains("boton-menu")) {
    evento.currentTarget.classList.add("activo");
  }
}

let enlacesPagina = document.querySelectorAll("[data-pagina]");

for (let i = 0; i < enlacesPagina.length; i++) {
  enlacesPagina[i].addEventListener("click", cambiarPagina);
}

document.getElementById("busqueda").addEventListener("input", mostrarNotas);

document.getElementById("botonCerrarSesion").addEventListener("click", function () {
  document.getElementById("aplicacion").classList.add("oculto");
  document.getElementById("pantallaLogin").classList.remove("oculto");
  document.getElementById("formularioLogin").reset();
  document.getElementById("mensajeLogin").textContent = "";
  document.querySelector("#formularioLogin button").disabled = false;
  intentos = 0;
});



let usuariosRegistrados = [];

document.getElementById("formularioRegistro").addEventListener("submit", function (evento) {
  evento.preventDefault();


  let nuevoUsuario = document.getElementById("nuevoUsuario").value.trim();
  let nuevaContrasena = document.getElementById("nuevaContrasena").value;
  let documento = document.getElementById("documento").value.trim();
  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
  let telefono = document.getElementById("telefono").value.trim();
  let genero = document.getElementById("genero").value.trim();
  let direccion = document.getElementById("direccion").value.trim();
  let mensajeRegistro = document.getElementById("mensajeRegistro");


  for (let i = 0; i < usuariosRegistrados.length; i++) {
    if (usuariosRegistrados[i].usuario === nuevoUsuario) {
      mensajeRegistro.textContent = "El nombre de usuario ya está registrado.";
      return;
    }
  }

  let usuarioNuevo = {
    usuario: nuevoUsuario,
    contrasena: nuevaContrasena,
    documento: documento,
    fechaNacimiento: fechaNacimiento,
    telefono: telefono,
    genero: genero,
    direccion: direccion
  };

  
  usuariosRegistrados.push(usuarioNuevo);

  
  mensajeRegistro.style.color = "#027a48"; 
  mensajeRegistro.textContent = "¡Usuario registrado con éxito! Ya puedes iniciar sesión.";
  
  document.getElementById("formularioRegistro").reset();


})
