const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config(".env");

const app = express();


const dataController = require('./controllers/dataController');

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json())

app.get("/:n", dataController.getData);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
