const path = require("path");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectsRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html")));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
