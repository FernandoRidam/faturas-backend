import express from "express";
import cors from "cors";

require('dotenv').config();

import routes from "./routes";

const app = express();
const server = require("http").Server( app );

app.use( cors());
app.use( express.json());

app.use( routes );

const port = process.env.PORT;

server.listen( port );

console.log(`Server Running In Port ${ process.env.PORT }`);
