#Configuracion para desarrollo
#Definir la Imagen Base de Docker
FROM node:20-alpine3.18 AS development

# Instalar dumb-init para manejar los procesos de señalización de los procesos hijos y evitar el zombie reaping
RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

# Declaro las variables
ENV DIR /rpi-server

# Creo el directorio en el contenedor
WORKDIR ${DIR}

# Copio los archivos necesarios para ejecutar el servidor
COPY package*.json ${DIR}

# Copio los archivos de configuración TypeScript
COPY tsconfig*.json ${DIR}
COPY .babelrc ${DIR}
COPY babel*.js ${DIR}
COPY ./src ${DIR}/src
COPY .prettierrc ${DIR}
COPY .eslin*.json ${DIR}
COPY .eslintignore ${DIR}
 # Copio el archivo de configuración de PM2
 # Copio el archivo de configuración de PM2
COPY ecosystem.config.js ${DIR}
COPY .env ${DIR}


# Instalo todas las dependencias, incluyendo las de desarrollo
RUN npm install  
# Expongo el puerto del monitor web de PM2
ENV PM2_PUBLIC_KEY 88vwqswbqte59hs
ENV PM2_SECRET_KEY fpft8zlq1wr1gl4


EXPOSE 9100

# Defino el entorno como producción
ENV NODE_ENV=production

# Levanto el servidor usando PM2
CMD ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
