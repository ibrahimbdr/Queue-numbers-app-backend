const { shopModel } = require("../models/shop");

function createShop(shop) {
  return shopModel.create(shop);
}

function updateShop(id, data) {
  console.log(data);
  return shopModel.update({ _id: id }, data, { runValidators: true });
}

function getShop() {
  return shopModel.find();
}

module.exports = {
  createShop,
  updateShop,
  getShop,
};
