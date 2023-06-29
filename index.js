const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.static("public"));

async function getData() {
  console.log("Connecting to MongoDB");
  let connection = await client.connect();
  console.log("Connected to MongoDB!");
  let db = await connection.db("E-commerce");

  let collection = await db.collection("products");

  let cart = await db.collection("Cart");
  let result = await collection.find({}).toArray();

  const dataString = JSON.stringify(result);
  fs.writeFileSync("products.json", dataString);
}

getData();

app.get("/", (req, res) => {
  const productsData = require("/Applications/SpinKart/products.json");
  let filteredProducts = [];

  if (req.query.query) {
    const searchQuery = req.query.query.toLowerCase();
    filteredProducts = productsData.filter((product) => {
      const productName = product.name && product.name.toLowerCase();
      const productPrice =
        product.price && product.price.toString().toLowerCase();
      const productCPU = product.CPU && product.CPU.toLowerCase();
      const productOS =
        product.OperatingSystem && product.OperatingSystem.toLowerCase();
      const productRAM = product.RAM && product.RAM.toLowerCase();
      const productROM = product.ROM && product.ROM.toLowerCase();

      return (
        (productName && productName.includes(searchQuery)) ||
        (productPrice && productPrice.includes(searchQuery)) ||
        (productCPU && productCPU.includes(searchQuery)) ||
        (productOS && productOS.includes(searchQuery)) ||
        (productRAM && productRAM.includes(searchQuery)) ||
        (productROM && productROM.includes(searchQuery))
      );
    });
  } else {
    filteredProducts = productsData;
  }

  res.render("home", { products: filteredProducts });
});

app.get("/computer%20&%20laptops", (req, res) => {
  const productsData = require("/Applications/SpinKart/products.json");
  let filteredProducts = [];

  if (req.query.query) {
    const searchQuery = req.query.query.toLowerCase();
    filteredProducts = productsData.filter((product) => {
      if (product.type === "pc") {
        const productName = product.name && product.name.toLowerCase();
        const productPrice =
          product.price && product.price.toString().toLowerCase();
        const productCPU = product.CPU && product.CPU.toLowerCase();
        const productOS =
          product.OperatingSystem && product.OperatingSystem.toLowerCase();
        const productRAM = product.RAM && product.RAM.toLowerCase();
        const productROM = product.ROM && product.ROM.toLowerCase();

        return (
          (productName && productName.includes(searchQuery)) ||
          (productPrice && productPrice.includes(searchQuery)) ||
          (productCPU && productCPU.includes(searchQuery)) ||
          (productOS && productOS.includes(searchQuery)) ||
          (productRAM && productRAM.includes(searchQuery)) ||
          (productROM && productROM.includes(searchQuery))
        );
      }
    });
  } else {
    filteredProducts = productsData;
  }

  res.render("computer", { products: filteredProducts });
});

app.get("/mobiles", (req, res) => {
  const productsData = require("/Applications/SpinKart/products.json");
  let filteredProducts = [];

  if (req.query.query) {
    const searchQuery = req.query.query.toLowerCase();
    filteredProducts = productsData.filter((product) => {
      if (product.type === "mobile") {
        const productName = product.name && product.name.toLowerCase();
        const productPrice =
          product.price && product.price.toString().toLowerCase();
        const productCPU = product.CPU && product.CPU.toLowerCase();
        const productOS =
          product.OperatingSystem && product.OperatingSystem.toLowerCase();
        const productRAM = product.RAM && product.RAM.toLowerCase();
        const productROM = product.ROM && product.ROM.toLowerCase();
        const productCamera = product.Camera && product.Camera.toLowerCase();
        const productBattery = product.Battery && product.Battery.toLowerCase();
        const productCellularTechnology =
          product.CellularTechnology &&
          product.CellularTechnology.toLowerCase();

        return (
          (productName && productName.includes(searchQuery)) ||
          (productPrice && productPrice.includes(searchQuery)) ||
          (productCPU && productCPU.includes(searchQuery)) ||
          (productOS && productOS.includes(searchQuery)) ||
          (productRAM && productRAM.includes(searchQuery)) ||
          (productROM && productROM.includes(searchQuery))(
            productCamera && productCamera.includes(searchQuery)
          )(productBattery && productBattery.includes(searchQuery))(
            productCellularTechnology &&
              productCellularTechnology.includes(searchQuery)
          )
        );
      }
    });
  } else {
    filteredProducts = productsData;
  }

  res.render("mobile", { products: filteredProducts });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/account", (req, res) => {
  res.render("acc.ejs");
});

app.listen("8307", () => {
  console.log("Listening to port 8307");
});
