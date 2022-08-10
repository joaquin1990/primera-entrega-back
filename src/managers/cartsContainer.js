import fs from "fs";
import __dirname from "../utils.js";

const path = __dirname + "/files/carts.json";

class Container {
  // Get all carts:
  getAll = async () => {
    try {
      if (fs.existsSync(path)) {
        let fileData = await fs.promises.readFile(path, "utf8");
        let carts = JSON.parse(fileData);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };
  // Add new cart:
  save = async (cart) => {
    try {
      let carts = await this.getAll();
      if (carts.length === 0) {
        cart.id = 1;
        cart.products = [];
        cart.timestamp = Date.now();
        carts.push(cart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        console.log(`El id del cart agregado es el "${cart.id}", carts:`);
        console.log(carts);
      } else {
        cart.id = carts[carts.length - 1].id + 1;
        cart.products = [];
        cart.timestamp = Date.now();
        carts.push(cart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        console.log(`El id del cart agregado es el "${cart.id}", carts:`);
      }
    } catch (error) {
      console.log("Cannot write cart file: " + error);
    }
  };

  // GET all products from a cart by its cid
  getProductsByCid = async (number) => {
    try {
      const allCarts = await this.getAll();
      let findedCart = allCarts.find((cart) => {
        if (cart["id"] == number) {
          return cart;
        }
      });
      let products = findedCart["products"];
      return products;
    } catch (error) {
      console.log("Hay un error: " + error);
    }
  };

  //  DELETE a product by its cid and pid:
  // First we have to get the cart by its id
  // Then find the product by its id
  // Then delete the product (con un filter de todo lo que no sea el pid) and rewrite the FS.

  deleteProductInCart = async (cid, pid) => {
    const allCarts = await this.getAll();
    let findCart = allCarts.find((cart) => {
      if (cart["id"] == cid) {
        return cart;
      }
    });
    findCart["products"] = findCart["products"].filter((product) => {
      return product["id"] != pid;
    });
    console.log(allCarts);
    await fs.promises.writeFile(path, JSON.stringify(allCarts, null, "\t"));
    return allCarts;
  };

  getById = async (number) => {
    try {
      const allProducts = await this.getAll();
      if (allProducts.id != number) {
        return allProducts.find((element) => element.id == number);
      } else {
        console.log("null");
      }
    } catch (error) {
      console.log("Hay un error: " + error);
    }
  };

  deleteById = async (number) => {
    try {
      let carts = await this.getAll();
      let findItem = carts.find((item) => item.id == number);
      let newcarts = carts.filter((item) => item.id != number);
      if (findItem) {
        await fs.promises.writeFile(path, JSON.stringify(newcarts, null, "\t"));
        console.log("Se ha eliminado el siguiente item: " + findItem);
      } else {
        console.log(`El id "${number}" no existe!`);
      }
    } catch (error) {
      console.log("Cannot delete item: " + error);
    }
  };

  deleteAll = async () => {
    try {
      let items = await this.getAll();
      items = [];
      await fs.promises.writeFile(path, JSON.stringify(items, null, "\t"));
      console.log("Se han eliminado todos los items");
    } catch (error) {}
  };

  update = async (obj, id) => {
    let allProducts = await this.getAll();
    allProducts.map(function (item) {
      if (item.id == id) {
        item.title = obj.title;
        item.price = obj.price;
        item.thumbnail = obj.thumbnail;
      }
    });
    await fs.promises.writeFile(path, JSON.stringify(allProducts, null, "\t"));
    return allProducts;
  };
}

export default Container;
