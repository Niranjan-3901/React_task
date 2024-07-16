const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const axiosClient = axios.create({
  baseURL: "https://json-server-c67opnddza-el.a.run.app",
});

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const response = await axiosClient.get("/products");
    let productsList = response.data;

    const {
      category,
      company,
      availability,
      maxPrice,
      minPrice,
      minRating,
      sort,
    } = req.query;

    if (category &&
      category !== "undefined" &&
      category !== "All") {
      productsList = productsList.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (company &&
      company !== "undefined" &&
      company !== "All") {
      productsList = productsList.filter(
        (product) =>
          product.company.toLowerCase() === company.toLowerCase()
      );
    }

    if (
      availability &&
      availability !== "undefined" &&
      availability !== "All"
    ) {
      productsList = productsList.filter((product) => {
        return (
          product.availability.toLowerCase() === availability.toLowerCase()
        );
      });
    }

    if (maxPrice) {
      productsList = productsList.filter(
        (product) =>
          maxPrice >= product.price
      );
    }

    if (minPrice) {
      productsList = productsList.filter((product) => {
        return minPrice <= product.price;
      });
    }

    if (minRating) {
      productsList = productsList.filter(
        (product) => minRating <= product.rating
      );
    }

    if (sort) {
      productsList = productsList.sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-asc":
            return a.rating - b.rating;
          case "rating-desc":
            return b.rating - a.rating;
          case "name-asc":
            return a.productName.localeCompare(b.productName);
          case "name-desc":
            return b.productName.localeCompare(a.productName);
          case "discount-asc":
            return a.discount - b.discount;
          case "discount-desc":
            return b.discount - a.discount;
          case "id-asc":
            return a.id - b.id;
          case "id-desc":
            return b.id - a.id;
          default:
            return 0;
        }
      });
    }

    res.json(productsList);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(3033, () => {
  console.log("Server is listening on port 3033.");
});
