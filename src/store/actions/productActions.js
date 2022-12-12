import { FETCH_PRODUCTS } from "./types";
import axios from "axios";

const productsAPI =
  "http://localhost:8001/api/products";

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
