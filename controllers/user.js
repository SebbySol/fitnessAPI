const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
module.exports.registerUser = (req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  newUser.save()
    .then((user) => res.status(201).send({ message: "Registered Successfully" }))
    .catch((err) => res.status(500).send({ error: "Error in Save", details: err }));
};

// Login
module.exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result === null) {
        return res.status(404).send({ error: "No Email Found" });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        result.password
      );

      if (isPasswordCorrect) {
        return res.status(200).send({
          access: jwt.sign(
            { id: result._id, email: result.email },
            process.env.JWT_SECRET
          )
        });
      } else {
        return res.status(401).send({ error: "Email and password do not match" });
      }
    })
    .catch((err) => res.status(500).send({ error: "Error in Find", details: err }));
};

// GET User Details
module.exports.getUserDetails = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send({ user });
    })
    .catch((err) => res.status(500).send({ error: "Error in Find", details: err }));
};