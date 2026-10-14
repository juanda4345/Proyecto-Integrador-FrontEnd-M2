# ESD - Gestión de notas

Proyecto académico de FrontEnd para registrar y consultar calificaciones de estudiantes.

## Funciones

- Acceso de demostración.
- Listado de estudiantes, materias y notas.
- Promedio de tres notas y estado de aprobación.
- Crear, consultar, editar y eliminar registros (CRUD).
- Búsqueda por estudiante o materia.
- Datos de ejemplo escritos en un arreglo de JavaScript.

## Cómo iniciar

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Abre index.html en un navegador o usa Live Server.
3. Ingresa con:
   - Usuario: admin
   - Contraseña: 1234

El acceso es únicamente una demostración. El proyecto no tiene servidor ni base de datos.

## Archivos

- index.html: estructura de las páginas, formularios y tablas.
- css/estilos.css: estilos de la interfaz y diseño adaptable.
- js/Dom.js: datos, cálculos, operaciones CRUD, login y eventos del DOM.
- img/logo-esd.png: logo de ESD.

## Reglas de las notas

Cada nota debe estar entre 1.0 y 5.0. El promedio se calcula sumando las tres notas y dividiendo entre tres. Un promedio igual o mayor a 3.0 se considera aprobado.

Los registros iniciales están en el arreglo notasIniciales de js/Dom.js. Los cambios hechos durante la sesión se mantienen en memoria; al recargar la página se cargan otra vez los datos iniciales.

## Temas de JavaScript

El proyecto utiliza variables, arreglos, objetos, funciones, ciclos for, condicionales, operadores, eventos y selectores del DOM. Las filas de la tabla se crearon con createElement y appendChild.

Para explicar el flujo: el formulario captura valores, JavaScript los convierte a números, actualiza el arreglo notas y vuelve a dibujar la tabla y el resumen.
