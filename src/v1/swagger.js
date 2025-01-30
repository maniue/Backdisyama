const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


//Metadata info about API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {tittle: "Reporte Jira-QASE", version: "1.0.0"}
    },
    apis: ["src/v1/routes/qaseReportRoutes.js"],
};

//Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v1/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
};


module.exports = { swaggerDocs };