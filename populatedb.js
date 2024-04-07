#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/categories");
const Item = require("./models/items");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  number_in_stock
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Mobiles",
      "Mobile phones are no more merely a part of our lives. "
    ),
    categoryCreate(
      1,
      "Electronics",
      "Includes devices like smartphones, laptops, tablets, cameras, TVs, etc.Subcategories may include brands, types (e.g., smartphones, laptops), and accessories."
    ),
    categoryCreate(
      2,
      "Home & Kitchen",
      "Encompasses products like furniture, appliances, cookware, utensils, etc.Subcategories may include room-specific items (e.g., bedroom, kitchen), appliances, and decor."
    ),
    categoryCreate(
      3,
      "Apparel",
      "Covers clothing items such as shirts, pants, dresses, shoes, etc.Subcategories may include gender, age group, season, and style."
    ),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "iPhone 12",
      "Latest smartphone from Apple",
      categories[0],
      799,
      50
    ),
    itemCreate(
      1,
      "Samsung Galaxy",
      "High-performance Android smartphone",
      categories[0],
      899,
      40
    ),
    itemCreate(
      2,
      "Sony Bravia",
      "55-inch 4K Ultra HD Smart LED TV",
      categories[1],
      999,
      30
    ),
    itemCreate(
      3,
      "Canon EOS Rebel T7",
      "DSLR Camera Bundle with EF-S 18-55mm Lens",
      categories[1],
      499,
      20
    ),
    itemCreate(
      4,
      "Instant Pot",
      "6 Quart 7-in-1 Multi-Use Programmable Cooker",
      categories[2],
      99,
      60
    ),
    itemCreate(
      5,
      "KitchenAid Stand Mixer",
      "5-Quart Artisan Design Series with Glass Bowl",
      categories[2],
      399,
      25
    ),
    itemCreate(
      6,
      "Nike Air Max",
      "Men's Running Shoes",
      categories[3],
      120,
      100
    ),
    itemCreate(
      7,
      "Levi's 501 Jeans",
      "Original Fit Men's Jeans",
      categories[3],
      59,
      75
    ),
  ]);
}
