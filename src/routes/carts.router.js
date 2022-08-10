import { Router } from "express";
// import Container from "../managers/productsContainer.js";
import Container from "../managers/cartsContainer.js";

const router = Router();
const container = new Container();

//GET "/api/carts" -> returns all the carts
router.get("/", async (req, res) => {
  let getAllCarts = await container.getAll();
  res.send(getAllCarts);
});

//POST "/api/carts" - recieves and adds a cart
router.post("/", async (req, res) => {
  let cart = req.body;
  res.send({ status: "succes", message: "Cart Added" });
  await container.save(cart);
});

// POST "/:cid/products" - Add products to a specific cart (cid)
// Falta hacerr!
router.post("/:cid/products", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  console.log(cid);
  console.log(pid);
});

//DELETE "/api/carts/:cid" - deletes a carts by its id
router.delete("/:cid", async (req, res) => {
  let cid = req.params.cid;
  await container.deleteById(cid);
  res.send({ status: `Cart with id '${cid}' has been deleted` });
});
export default router;

// DELETE "/:cid/products/:pid" - Delete a product by its id in a cart located by its id.
// ----------- we are here ----------- //
router.delete("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  await container.deleteProductInCart(pid, cid);
  res.send({
    status: `The product id:${pid} from the cart id:${cid} was deleted`,
  });
});

// GET "/:cid/products" - returns all products from cart
router.get("/:cid/products", async (req, res) => {
  let cid = Number(req.params.cid);
  let products = await container.getProductsByCid(cid);
  res.send({ products });
});
