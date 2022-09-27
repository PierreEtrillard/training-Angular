const express = require("express");
const sequelize = require("sequelize")
const app = express();
const mariaDb = require("mariadb");
const usersRoutes = require("./routes/users");
const saucesRoutes = require("./routes/sauces");
const path = require("path");
// récupperation des identifiants de connection dans le fichier '.env'
const dotenv = require("dotenv");
dotenv.config();
const mongoPwd = process.env.mongoLogin;

mongoose
  .connect(mongoPwd, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connectée"))
  .catch((err) => {
    console.error(err);
  });
//***********************               ROUTES             *************************/
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/auth", usersRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
