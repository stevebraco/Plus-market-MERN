import bcrypt from "bcryptjs";
const data = {
  blogs: [
    {
      title: "Le titre du blog",
      image: "./images/deal-bg.jpg",
      text: "> ### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.\n",
      category: 'food',
      date: new Date(),
    },
    {
      title: "The best recipes",
      image: "./images/recipes-1.jpeg",
      text: "> ### The quarterly results look great! - Revenue was off the chart. - Profits were higher than ever.  *Everything* is going according to **plan**.\n",
      category: 'food',
      date: new Date(),
    }
  ],
  users: [
    {
      name: "steve",
      email: "admin@admin.com",
      password: bcrypt.hashSync("aaaaaa", 8),
      isAdmin: true,
    },
  ],

  products: [
    {
      name: "organic banana",
      image: "./images/product-1.png",
      price: 10.5,
      countInStock: 10,
      rating: 4.5,
      category: "fruits",
    },
    {
      name: "organic tomato",
      image: "./images/product-2.png",
      price: 10.5,
      countInStock: 10,
      rating: 5,
      category: "fruits",
    },
    {
      name: "orange",
      image: "./images/product-3.png",
      price: 5.5,
      countInStock: 20,
      rating: 4,
      category: "fruits",
    },
    {
      name: "natural mild",
      image: "./images/product-4.png",
      price: 7.99,
      countInStock: 2,
      rating: 4,
      category: "milk and dairies",
    },
    {
      name: "organic grapes",
      image: "./images/product-5.png",
      price: 15.99,
      countInStock: 0,
      rating: 5,
      category: "fruits",
    },
    {
      name: "natural almonts",
      image: "./images/product-6.png",
      price: 12.99,
      countInStock: 5,
      rating: 3,
      category: "dried fruit",
    },
    {
      name: "organic apple",
      image: "./images/product-7.png",
      price: 8.2,
      countInStock: 45,
      rating: 4.5,
      category: "fruits",
    },
    {
      name: "natural butter",
      image: "./images/product-8.png",
      price: 12.99,
      countInStock: 0,
      rating: 3,
      category: "milk and dairies",
    },
    {
      name: "organic carrot",
      image: "./images/product-9.png",
      price: 12.99,
      countInStock: 5,
      rating: 3,
      category: "vegetables",
    },
  ],
};

export default data;
