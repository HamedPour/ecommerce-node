/**
 * This file is only here coz I am lazy. It should only be executed ONCE on it own in node to add the following items to the MongoBD Atlas
 */

const Product = require("../models/products");
const mongoose = require("mongoose");
const MONGODO_ATLAS_URI = require("../config/Atlas.dev");

// mongoose.connect(MONGODO_ATLAS_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("connected", () => {
//   console.log("Mongoose is connected to Atlas");
// });

const products = [
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/g/s/gsx130ral9_qeb_d.jpg",
    title: "SUZUKI HAYABUSA",
    description:
      "Celebrating 20 years of the iconic Suzuki Hayabusa. (1999 - 2019) The Hayabusa is quite simply the Ultimate Sportbike. Twist the throttle, and it responds with awesome acceleration and crisp throttle response in every gear with an unbelievable top-end charge. Thanks to a lightweight and rigid twin-spar aluminium frame and state-of-the-art suspension, that performance is matched by equally impressive handling, providing exceptional control in tight corners, reassuring stability in sweeping turns and a smooth ride on the highway.",
    price: 12000,
  }),
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/1/7/17_honda_cbr600rr_abs_rhp.jpg",
    title: "HONDA CBR650R 2019",
    description:
      "New twin air ducts on either side of the fuel tank feed a larger volume of air, as opposed to the single, central duct of the old model, raising atmospheric pressure in the airbox. They also produce a throaty intake roar. The exhaust now features a larger bore tailpipe inside the muffler to flow more gas and, with its exit pipe angled upward, to emit an emotional howl.",
    price: 12000,
  }),
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/y/z/yzfr1_2_2.jpg",
    title: "YAMAHA YZF-R1 2019",
    description:
      "Packed with MotoGP YZR-M1 technology, the next generation R1 pushes the boundaries. With an incredible crossplane engine, short wheelbase chassis and high-tech electronics, R1 is born for the track and takes your riding to a new ball park Specs offer an insight into R1 capabilities. But it’s what you can’t see that makes this focused superbike so special. A central nervous system comprising a 6-axis Inertial Measurement Unit that constantly senses chassis motion in 3D",
    price: 37000,
  }),
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/k/a/kawasaki_ninja_zx-14r_brembo_hlins_2019_1.jpg",
    title: "KAWASAKI NINJA",
    description:
      "he Ninja ZX-14R’s ultra-powerful 1441cm³ inline four-cylinder engine puts it in a class all its own. Add in our most advanced electronics system, including traction control, ABS and power mode selection and with an innovative monocoque frame, and stunning bodywork and the ZX-14R is a phenomenon that you must experience to believe.",
    price: 21000,
  }),
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/G/S/GSXR1000AL71.jpg",
    title: "SUZUKI GSX-R1000",
    description:
      "The all-new, 999.8cm3 in-line four cylinder, DOHC, liquid-cooled engine, is the most powerful, hardest accelerating, cleanest running GSX-R engine ever built. Producing 148.6kW (202ps) @13,200rpm with 117.6Nm of torque @10,800rpm, the new engine surpases the competition. The design target was simple increase top end power without sacrificing low and midrange output. To achieve this Suzuki engineers had to employ advanced MotoGP derived technologies known as the Broad Power System.",
    price: 42000,
  }),
  new Product({
    imagePath:
      "https://www.peterstevens.com.au/media/catalog/product/cache/1/image/983x590/9df78eab33525d08d6e5fb8d27136e95/k/a/kawasaki_ninja_h2_carbon_2019_1.jpg",
    title: "KAWASAKI NINJA H2",
    description:
      "An extension of the “Built Beyond Belief” concept of the original Ninja H2, the new Ninja H2 Carbon benefits from engine updates that increase maximum power to 231 PS, making these supercharged supersport machines Kawasaki’s most powerful street models ever.",
    price: 22000,
  }),
];

// Save each using mongoooooooose
let done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    if (err) {
      console.log("ERROR IN SEEDER", err.message);
    } else {
      done++;
      if (done === products.length) {
        exit();
      }
    }
  });
}

function exit() {
  console.log("EXITED!");
  mongoose.disconnect();
}
