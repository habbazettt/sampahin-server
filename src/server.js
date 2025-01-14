const express = require('express');
const cors = require("cors");
require('dotenv').config()
const cookieParser = require('cookie-parser');
const logRequest = require('./middleware/log');
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./docs/apiDocs.json')

const wasteRoute = require('./routes/waste.routes');
const historyRoute = require('./routes/history.routes');

const app = express()

app.use(cors({
    origin: ['https://sampahin.netlify.app'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logRequest)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

app.get('/', (req, res) => res.send('Server is running!'))
app.use('/predict', wasteRoute);
app.use('/histories', historyRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})