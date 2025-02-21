const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/enviroment',require('./routes/envDataRoutes'));

app.listen(PORT,()=>console.log(`SERVER IS RUNNING ON ${PORT}`));