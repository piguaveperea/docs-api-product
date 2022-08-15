const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const morgan = require('morgan')

const options = require('./options.json')

const setting = require('./setting')

app.use(morgan('dev'))
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(options));
app.use('/', require('./routers/product'))


app.listen(3000, ()=>{
    console.log('Listen to port: 3000 ');
})