const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/UserRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());

app.use("/api", routes);

const uri = process.env.URI;

mongoose.connect(uri).then(() => {
    console.log("connected to mongo");
}).catch((e) => {
    console.error(e);
})

const server = http.createServer(app);

server.listen(5000, () => {
    console.log("connected to server");
});

