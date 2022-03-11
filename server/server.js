require("dotenv").config();
require("./config/db")();

const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", require("./routes/auth"));
app.use("/api/projects", require("./routes/projectRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
