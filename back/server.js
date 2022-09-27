const express = require("express");
const app = express();
const engine = require("express-handlebars").engine;
const { Sequelize, DataTypes, STRING, ABSTRACT } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const mariaDb = require("mariadb");
//Initialisation DB server avec sequelize: nomDelaBDD, user, pwd, obj{host:ip,dialect:type deBDD}
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUser,
  process.env.dbPwd,
  {
    host: process.env.dbAdress,
    dialect: "mariadb",
  }
);

async function dbConnector() {
  try {
    await sequelize.authenticate();
    await Favori.sync({ alter: true });
    await User.sync({ alter: true });

    console.log("Connection à la Base de donnée réussie !");
  } catch (error) {
    console.error(
      "Une erreur est survenu lors de la connection à la base de donnée: ",
      error
    );
  }
}
//************Models***************** */
const User = sequelize.define("User", {
  nom: { type: DataTypes.STRING },
  prenom: { type: DataTypes.STRING },
  mail: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});
const Favori = sequelize.define("Favori", {
  name: { type: DataTypes.STRING, allowNull: false },
  characterId: { type: DataTypes.INTEGER },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  likesArray: { type: DataTypes.STRING},
  dislikesArray: { type: DataTypes.STRING}
});

dbConnector();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
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
app.get("/", async (req, res) => {
  const users = await User.findAll();
  const usersDisplay = users.map((user) => {
    return `${user.dataValues.nom} - ${user.dataValues.prenom}`;
  });
  res.render("home", { users: users });
});

app.get("/favoris", async (req, res) => {
  Favori.findAll()
    .then((favoris) => {
      res.status(200).json(favoris);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
app.get("/favoris/:id", async (req, res) => {
  Favori.findOne({
    where: { characterId: req.body },
  })
    .then((favoris) => {
      res.status(200).json(favoris);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.post("/favoris", async (req, res, next) => {
  const postDataBrute = req.body;
  console.log(typeof postDataBrute.characterId);
  await Favori.create({
    name: req.body.name,
    characterId:req.body.characterId,
    imageUrl: req.body.imageUrl,
  })
  res.status(200).json({message:"favori enregistré"});
});

app.post("/signin", async (req, res, next) => {
  const postDataBrute = req.body;
  console.log(postDataBrute);
  await User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    password: req.body.password,
  });
  res.status(200).redirect("/");
});

app.listen(3000, () => {
  console.log("serveur démarré !");
});
