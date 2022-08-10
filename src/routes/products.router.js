import { Router } from "express";
import Contenedor from "../managers/productsContainer.js";

const router = Router();
const container = new Contenedor();

//GET '/api/products' -> returns all the products
router.get("/", async (req, res) => {
  let getAllProducts = await container.getAll();
  res.send(getAllProducts);
});

//GET '/api/products' -> returns 1 product by its id
router.get("/:id", async (req, res) => {
  let allProducts = await container.getAll();
  let id1 = Number(req.params.id);
  let item = allProducts.find((item) => item.id === id1);
  item ? res.send(item) : res.send("404 El valor pedido no existe");
});

//POST '/api/products' - recieves and adds a product
router.post("/", async (req, res) => {
  let product = req.body;
  res.send({ status: "succes", message: "Product Added" });
  await container.save(product);
});

//PUT '/api/products/:id' -> recieves and updates a product
router.put("/:id", async (req, res) => {
  let id = Number(req.params.id);
  console.log("Console.log(req.body): " + JSON.stringify(req.body));
  let products = await container.update(req.body, id);
  res.send(products);
});

//DELETE '/api/products/:id' -> deletes a product by id
router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  await container.deleteById(id);
  res.send({ status: `Product with id: ${id} has been deleted` });
});

export default router;
