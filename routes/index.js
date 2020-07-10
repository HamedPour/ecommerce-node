const express = require("express");
const router = express.Router();

const Product = require("../models/products");

/* GET products page. */
router.get("/", function (req, res, next) {
  Product.find(function (err, data) {
    if (err) {
      console.log("Error in ROUTES", err.message);
    } else {
      // the newProducts step below is needed coz Handlebare has issues
      // with access prototype methods.
      const newProducts = data.map((data) => {
        return {
          imagePath: data.imagePath,
          title: data.title,
          description: data.description,
          price: data.price,
        };
      });
      let productGroup = [];
      const groupSize = 3;
      for (let i = 0; i < newProducts.length; i += groupSize) {
        productGroup.push(newProducts.slice(i, i + groupSize));
      }
      res.render("shop/index", { title: "Products", products: productGroup });
    }
  });
});

module.exports = router;
