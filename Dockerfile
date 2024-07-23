# Usar la imagen oficial de Node.js
FROM node:14

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Instalar las dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD [ "node", "server.js" ]
