const fs = require("fs");

const saveUser = data => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("users.json", stringifyData);
};

const getUsers = () => {
  const jsonData = fs.readFileSync("users.json");
  return JSON.parse(jsonData);
};

module.exports = {
  saveUser,
  getUsers
};
