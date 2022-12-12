import { FETCH_PRODUCTS } from "./types";
import axios from "axios";

const productsAPI =
  "https://react-shopping-cart-67954.firebaseio.com/products.json";

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  },
};

export const fetchProducts = (filter, callback) => (dispatch) => {
  axios
    .get(productsAPI)
    .then((res) => {
      let { products } = res.data;

      if (!!filter && filter.length > 0) {
        products = products.filter((p) => p.title.includes(filter));
      }

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Could not fetch products. Try again later.");
    });
};
