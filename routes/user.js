const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

// session and csrf protections
const csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("user/profile");
});

// It is important where you put this middleware - it should only
// be in front of paths that you don't want to show if the user IS lOGGED IN
router.use("/", isNotLoggedIn, function (req, res, next) {
  next();
});

router.get("/signup", function (req, res) {
  const errorMessages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: errorMessages,
    hasErrors: errorMessages.length > 0,
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true,
  })
);

router.get("/signin", function (req, res) {
  const errorMessages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: errorMessages,
    hasErrors: errorMessages.length > 0,
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;

// my middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}
