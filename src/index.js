"use strict";

const express = require("express");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const dotenv = require('dotenv');
const cors = require('cors');
const v1inventoryRoutes = require("./v1/routes/inventoryRoutes");
const clientRoutes = require('./v1/routes/clientRoutes');
const repuestosRoutes = require('./v1/routes/repuestosRoutes');
const categoryRoutes = require('./v1/routes/categoryRoutes');
const brandRoutes = require('./v1/routes/brandRoutes');
const providerssRoutes = require('./v1/routes/providerssRoutes');
const currencyRoutes = require('./v1/routes/currencyRoutes');
const quotesRoutes = require('./v1/routes/quotesRoutes');
const dashboardRoutes = require('./v1/routes/dashboardRoutes');
const bodyParser = require("body-parser");
const { connectionDB } = require("./database/disyama");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Backend Node.js listo');
});

// Definir el modelo User en un archivo separado (mejor organización)
const User = require('./models/User'); // Verifica que este archivo esté en la ruta correcta

// Endpoint de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.json({ token, redirect: '/api/v1/dashboard' });
});

// Rutas API
app.use("/api/v1/", v1inventoryRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/repuestos', repuestosRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/currency', currencyRoutes); 
app.use('/api/v1/providers', providerssRoutes); 
app.use('/api/v1/quotes', quotesRoutes); 
app.use('/api/v1/dashboard', dashboardRoutes);

// Conectar a la base de datos antes de iniciar el servidor
async function startServer() {
    try {
        await connectionDB(); // Asegurarnos de que la conexión se realice antes de arrancar el servidor
        console.log("DB Connected");

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
            V1SwaggerDocs(app, PORT);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
        process.exit(1);
    }
}

// Iniciar el servidor
startServer();
