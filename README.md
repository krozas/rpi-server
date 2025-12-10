# DGI - RPI

Este proyecto es un servidor construido con Node.js, Express, Knex, TypeScript y una base de datos SQLite3 en memoria.
La base es recreada en cada inicio, por lo que es ideal para pruebas rápidas, demos o entornos sin persistencia. 

Tecnologías

Node.js
Express
Knex (Query Builder)
SQLite3-better en memoria (:memory:)
TypeScript

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


🛠️ Requisitos
Node.js ≥ 20 
npm 

No se necesita instalar SQLite manualmente

📦 Instalación
npm install


▶️ Ejecutar el servidor

Modo desarrollo:
npm run dev

El servidor corre por defecto en: http://localhost:9100

📌 Notas importantes

SQLite en memoria se borra cada vez que el servidor se reinicia. 