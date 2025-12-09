# DGI - RPI

Servidor Node con express, typescript y knex con sqllite3-better para la base de datos.
Proyecto para RPI. Concurso Programador/a de Aplicaciones Informáticas Senior MF6 2025.

Estructura:

- src/config: archivos de configuración (variables de entorno, knex, etc)
- src/middlewares: middlewares para las requests
- src/modules: módulos de código.
  - ConfiguracionModules: se definen las rutas y se conectan con los módulos.
  - /configuracion: ejemplo de módulo de configuración que tiene una ruta principal (/configuracion) y dentro otro módulo con su propia ruta.
  - - Estructura de módulos:
      - routes: rutas para utilizar el módulo.  
      - services: código con lógica de negocios, que hacen uso de los repositories. Los servicios pueden ser utilizados desde otros módulos.
      - repository: código con lógica de funciones a ejecutar en la base de datos.
      - types: tipos del módulo.  
      - utils: utilidades para el módulo.
