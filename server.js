const express = require("express");
var cors = require("cors");
const util = require("./util.js");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// create a GET route
app.post("/api/login", (req, res) => {
  const existUsers = util.getUsers();
  const user = req.body;
  const findExist = existUsers.find(
    ({ userName, password }) =>
      userName === user.userName && password === user.password
  );
  if (!findExist) {
    return res
      .status(200)
      .send({ success: false, msg: "Username or Password is not match" });
  }
  delete findExist.password;
  res.send({
    success: true,
    msg: "You have logged in successfully!",
    data: findExist
  });
});

// create a GET route
app.post("/api/signup", (req, res) => {
  const existUsers = util.getUsers();
  const user = req.body;
  if (
    !user.userName ||
    !user.password ||
    !user.email ||
    !user.firstName ||
    !user.lastName ||
    !user.gender ||
    !user.country
  ) {
    return res
      .status(200)
      .send({ error: true, msg: "mandatory data is missing" });
  }
  const findExist = existUsers.find(
    ({ userName }) => userName === user.userName
  );
  if (findExist) {
    return res
      .status(200)
      .send({ success: false, msg: "User name already exist" });
  }
  existUsers.push(user);
  util.saveUser(existUsers);
  res.send({ success: true, msg: "You have registered with us successfully!" });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
