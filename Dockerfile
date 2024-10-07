# Etapa 1: Construcción de la aplicación con Node.js v20.17.0 y Vite
FROM node:20.17.0 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos el resto de los archivos del proyecto al contenedor
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copiamos los archivos construidos desde la fase anterior al directorio de NGINX
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para servir la aplicación
EXPOSE 80

# Configuramos NGINX para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
