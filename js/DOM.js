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

