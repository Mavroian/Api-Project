const express = require("express");

const server = () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send("hellllo");
  });

  return app;
};
module.exports = { server };
