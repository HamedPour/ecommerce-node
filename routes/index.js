const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const csrf = require("csurf");
const passport = require("passport");
// session and csrf protections
const csrfProtection = csrf();
router.use(csrfProtection);

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

router.get("/user/signup", function (req, res, next) {
  const errorMessages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: errorMessages,
    hasErrors: errorMessages.length > 0,
  });
});

router.get("/user/profile", function (req, res, next) {
  res.render("user/profile");
});

router.post(
  "user/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true,
  })
);

router.get("/user/signin", function (req, res) {
  const errorMessages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: errorMessages,
    hasErrors: errorMessages.length > 0,
  });
});

router.post(
  "/user/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

module.exports = router;
