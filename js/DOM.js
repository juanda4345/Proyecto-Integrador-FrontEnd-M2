let notasIniciales = [
  { id: 1, estudiante: "Santiago Gómez", materia: "Frontend", nota1: 4.3, nota2: 4.5, nota3: 4.4 },
  { id: 2, estudiante: "Valentina Rodríguez", materia: "Backend", nota1: 4.6, nota2: 4.4, nota3: 4.8 },
  { id: 3, estudiante: "Mateo Fernández", materia: "Lógica de programación", nota1: 2.8, nota2: 3.0, nota3: 2.9 },
  { id: 4, estudiante: "Sofía Martínez", materia: "Metodologías ágiles", nota1: 3.9, nota2: 4.1, nota3: 4.0 },
  { id: 5, estudiante: "Lucas Pérez", materia: "Base de datos", nota1: 2.5, nota2: 2.7, nota3: 2.8 },
  { id: 6, estudiante: "Isabella Silva", materia: "Base de datos", nota1: 4.4, nota2: 4.6, nota3: 4.5 },
  { id: 7, estudiante: "Thiago Díaz", materia: "Frontend", nota1: 3.6, nota2: 3.8, nota3: 3.5 },
  { id: 8, estudiante: "Camila Castro", materia: "Backend", nota1: 4.8, nota2: 4.9, nota3: 4.6 }
];

let notas = notasIniciales;
let intentos = 0;

function calcularPromedio(nota) {
  let suma = nota.nota1 + nota.nota2 + nota.nota3;
  return suma / 3;
}

function estaAprobado(nota) {
  if (calcularPromedio(nota) >= 3.0) {
    return true;
  }

  return false;
}

/* PARTE 2: MOSTRAR DATOS EN LA PÁGINA */

// Crea una celda y la agrega a una fila de la tabla.
function crearCelda(fila, texto) {
  let celda = document.createElement("td");
  celda.textContent = texto;
  fila.appendChild(celda);
}

// Actualiza las tarjetas de resumen del inicio.
function actualizarResumen() {
  let cantidadAprobados = 0;
  let sumaPromedios = 0;

  for (let i = 0; i < notas.length; i++) {
    let promedio = calcularPromedio(notas[i]);
    sumaPromedios = sumaPromedios + promedio;

    if (estaAprobado(notas[i])) {
      cantidadAprobados = cantidadAprobados + 1;
    }
  }

  let promedioGeneral = 0;

  if (notas.length > 0) {
    promedioGeneral = sumaPromedios / notas.length;
  }

  document.getElementById("totalEstudiantes").textContent = notas.length;
  document.getElementById("promedioGeneral").textContent =
    promedioGeneral.toFixed(1);
  document.getElementById("totalAprobados").textContent = cantidadAprobados;
}

// Llena la tabla de notas. También filtra por nombre o materia.
function mostrarNotas() {
  let cuerpoTabla = document.getElementById("tablaNotas");
  let textoBusqueda = document.getElementById("busqueda").value.toLowerCase();
  let cantidadResultados = 0;

  cuerpoTabla.innerHTML = "";

  for (let i = 0; i < notas.length; i++) {
    let nombre = notas[i].estudiante.toLowerCase();
    let materia = notas[i].materia.toLowerCase();
    let coincide = nombre.indexOf(textoBusqueda) >= 0 ||
      materia.indexOf(textoBusqueda) >= 0;

    if (coincide) {
      cantidadResultados = cantidadResultados + 1;

      let fila = document.createElement("tr");
      crearCelda(fila, cantidadResultados);
      crearCelda(fila, notas[i].estudiante);
      crearCelda(fila, notas[i].materia);
      crearCelda(fila, notas[i].nota1.toFixed(1));
      crearCelda(fila, notas[i].nota2.toFixed(1));
      crearCelda(fila, notas[i].nota3.toFixed(1));
      crearCelda(fila, calcularPromedio(notas[i]).toFixed(1));

      let estado = "Reprobado";

      if (estaAprobado(notas[i])) {
        estado = "Aprobado";
      }

      crearCelda(fila, estado);

      let celdaAcciones = document.createElement("td");

      let botonEditar = document.createElement("button");
      botonEditar.type = "button";
      botonEditar.textContent = "Editar";
      botonEditar.className = "boton-editar";
      botonEditar.setAttribute("data-id", notas[i].id);
      botonEditar.addEventListener("click", editarNota);

      let botonEliminar = document.createElement("button");
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

// Muestra cuatro registros en la página de inicio.
function mostrarNotasRecientes() {
  let cuerpoTabla = document.getElementById("tablaRecientes");
  cuerpoTabla.innerHTML = "";

  for (let i = 0; i < notas.length && i < 4; i++) {
    let fila = document.createElement("tr");
    crearCelda(fila, notas[i].estudiante);
    crearCelda(fila, notas[i].materia);
    crearCelda(fila, calcularPromedio(notas[i]).toFixed(1));

    let estado = "Reprobado";

    if (estaAprobado(notas[i])) {
      estado = "Aprobado";
    }

    crearCelda(fila, estado);
    cuerpoTabla.appendChild(fila);
  }
}

// Actualiza todas las partes que muestran notas.
function actualizarPagina() {
  mostrarNotas();
  mostrarNotasRecientes();
  actualizarResumen();
}

