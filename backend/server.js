const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const {connectMongoDb}  = require('./config/mongo_db');

connectMongoDb();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/enviroment", require("./routes/envDataRoutes"));
app.use("/api", require("./routes/forecastModelRoute"));
app.use('/api',require('./routes/harvestRoutes'));
app.use('/admin', require('./routes/admin')); 

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON ${PORT}`));
