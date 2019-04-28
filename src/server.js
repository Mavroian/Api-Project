const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const myPath = "/Users/Florin/Documents/Code Chrysalis/API/";
const routes = require("../routes/index");
const hbs = require("express-handlebars");

const server = () => {
  const app = express();
  app.engine(
    `hbs`,
    hbs({
      extname: "hbs",
      defaultLayout: "layout",
      layoutsDir: `${myPath}/views/layouts`,
    })
  );
  app.set("views", path.join(myPath, "views/layouts"));
  app.set("view engine", `hbs`);
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.static(`${myPath}/public`));
  app.use(logger("dev"));
  app.use("/", routes);
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  return app;
};
module.exports = { server };
