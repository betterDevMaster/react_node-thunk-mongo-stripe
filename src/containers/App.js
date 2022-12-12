import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // , useNavigate
import React, { Component } from "react";
import "./App.css";

import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Shelf from "../components/shelf/Shelf";
import Checkout from "../components/checkout";
import Header from "../components/Header";
import Footer from "../components/Footer";

import store from "../store";

const PUBLIC_KEY =
  "pk_test_51ME719A5xeLlYMZsVPxWckUeVYnfh7LrElc0u7ykBW2tFa2FEgLoD5Bn22U3SYxHbtLIinLcDxa6rHytEcTZ13i0009fouY47e";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

class App extends Component {
  render() {
    return (
      <Elements stripe={stripeTestPromise}>
        <Provider store={store}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Shelf />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </Router>
        </Provider>
      </Elements>
    );
  }
}

export default App;
