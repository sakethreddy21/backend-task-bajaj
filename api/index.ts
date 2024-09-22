const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
import routes from "./routes/routes";

app.use(express.json());
// Routes
app.use(cors());

app.use('/bfhl', routes)
app.get("/", (req:any, res:any) => res.json("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;