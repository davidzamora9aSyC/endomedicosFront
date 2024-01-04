# Stage 1: Compilar y construir la aplicación Angular
FROM node:16 as build

WORKDIR /app

# Copiar los archivos de especificaciones y bloqueo de paquetes
COPY package.json package-lock.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar los archivos del proyecto
COPY . .

# Construir el proyecto para producción
RUN npm run build -- --output-path=./dist/out --configuration production

# Stage 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar el resultado de la construcción desde el paso anterior
COPY --from=build /app/dist/out/ /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que Nginx está escuchando
EXPOSE 80

# Ejecutar Nginx en el foreground para que Docker pueda seguir el proceso correctamente
CMD ["nginx", "-g", "daemon off;"]
