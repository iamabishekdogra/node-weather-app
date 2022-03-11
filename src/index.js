const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhishek Dogra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Abhishek Dogra",
  });
});

app.get("/about", (req, res) => {
  console.log(req.query.city);
  res.render("about", {
    AboutText: "google",
    title: "About",
    name: req.query.name,
    age: req.query.age,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "PLEASE PROVIDE SEARCH TERM",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek",
    errorcomment: "Opps! Weather Page is not found. Somthing went wrong!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek",
    errorcomment: "Opps! Page is not found. Somthing went wrong!",
  });
});

app.listen(port, () => {
  console.log("server is up for runing" + port);
});
