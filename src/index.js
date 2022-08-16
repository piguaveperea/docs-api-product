const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJDocs = require('swagger-jsdoc');
const morgan = require('morgan');
const path = require('path')

const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Documentación de API Producto",
            description: "Es una api para registo de producto de manara fácil",
            version: "v0.0.1",
            contact: {
                name: "Victor Hugo Piguave Perea",
                email: "victor.piguave.dev@gmail.com",
                url: "https://victor-pigauve.xyz"
            }
        }
    },
    apis:[`${path.join(__dirname, './routers/*.js')}`]
}

app.use(morgan('dev'))
app.use(express.json());
app.use('/', require('./routers/product'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJDocs(swaggerSpec)));



app.listen(3000, ()=>{
    console.log('Listen to port: 3000 ');
})