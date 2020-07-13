const express = require("express");
const router = express.Router();

const Product = require("../models/products");
const Cart = require("../models/cart");
const { session } = require("passport");

/* GET products page. */
router.get("/", function (req, res, next) {
  Product.find(function (err, data) {
    if (err) {
      console.log("Error in ROUTES", err.message);
    } else {
      // the newProducts step below is needed coz Handlebare has issues
      // with access prototype methods.
      const successMessage = req.flash("paymentSuccess")[0];
      console.log(successMessage);
      const newProducts = data.map((data) => {
        return {
          _id: data._id,
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
      res.render("shop/index", {
        title: "Products",
        products: productGroup,
        successMessage: successMessage,
        noMessage: !successMessage,
      });
    }
  });
});

// CART ROUTES FOR NOW

router.get("/add-to-cart/:id", function (req, res) {
  const productID = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productID, function (err, product) {
    if (err) {
      return res.redirect("/wtf-went-wrong-in-cart-router");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect("/");
  });
});

router.get("/shopping-cart", function (req, res) {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/checkout", function (req, res) {
  if (!req.session.cart) {
    return res.redirect("/");
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/checkout", {
    totalPrice: cart.totalPrice,
  });
});

router.post("/checkout", function (req, res) {
  if (!req.session.cart) {
    return res.redirect("/");
  }
  // Future To-do-list: setup proper card handling and validation
  // use some form of paypal moockup
  req.flash("paymentSuccess", "Your Order Was Placed Successfully!");
  req.session.cart = null;
  res.redirect("/");
});

module.exports = router;
