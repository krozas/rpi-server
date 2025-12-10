# DGI- RPI 

# 🗄️ Server Node.js con Express, Knex, SQLite3 en memoria y TypeScript

Este proyecto es un servidor construido con Node.js, Express, Knex, TypeScript y una base de datos SQLite3 en memoria.
La base es recreada en cada inicio, por lo que es ideal para pruebas rápidas, demos o entornos sin persistencia.

---

## 🚀 Tecnologías principales
Node.js

Express

Knex (Query Builder)

SQLite3 en memoria (:memory:)

TypeScript

ts-node-dev (para recarga en desarrollo)

---


## 📁 Estructura del proyecto

```
project/
├── src/
│   ├── config/
│   │   ├── knexRpi.ts 
│   │   database/ 
│   │   ├── database.config.ts
│   ├── routes/
│   ├── middlewares/
│   ├── modules/
│   │   ├── configuracion/
│   │   │   ├── ciudades/
│   │   │   │   ├── routes/
│   │   │   │   ├── services/
│   │   │   │   ├── repository/
│   │   │   │   ├── types/ 
│   │   │   ├── departamentos/
│   │   │   │   ├── routes/
│   │   │   │   ├── services/
│   │   │   │   ├── repository
│   │   │   │   ├── types/  
│   │   ├── inmuebles/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── repository/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── personas/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── types/
│   └── index.ts
├── knexfile.ts
├── package.json
├── tsconfig.json
└── README.md
```


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

---

## 🛠️ Requisitos
Node.js ≥ 20 
npm 
No se necesita instalar SQLite manualmente

Descargar el proyecto desde GitHub
git clone https://github.com/pjn/rpi-server.git


---

## 📦 Instalación
npm install

---
## ▶️ Ejecutar el servidor

Modo desarrollo:
npm run dev

El servidor corre por defecto en: http://localhost:9100
---
## 📌 Notas importantes

SQLite en memoria se borra cada vez que el servidor se reinicia. 
