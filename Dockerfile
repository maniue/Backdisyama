# Usa una imagen base de Node.js v20.17.0
FROM node:20.17.0

# Crea un directorio en el contenedor y establece como directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si los tienes) al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el contenido del proyecto al contenedor
COPY . .

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]
