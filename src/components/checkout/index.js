import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { connect } from "react-redux";
import { loadCart, removeProduct } from "../../store/actions/floatCartActions";
import { updateCart } from "../../store/actions/updateCartActions";
import CartProduct from "../floatCart/CartProduct";
import util from "../../util";

const Checkout = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleConfirm = async () => {
    const checkoutAPI = "http://localhost:8001/api/checkout";
    const checkedIDs = props.cartProducts.map((c) => c.id);

    if (
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.address === ""
    )
      return alert("Please enter your information.");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      return alert(error.message);
    }

    const { id } = paymentMethod;

    axios
      .post(checkoutAPI, {
        ...userInfo,
        checkedIDs,
        amount: props.cartTotals.totalPrice,
        payment_method: id,
      })
      .then((res) => {
        if (res.success) alert("Error::: " + res.message);
      })
      .catch((err) => {
        console.log(err);
        alert("Error::: " + err.message);
        throw new Error("Could not fetch products. Try again later.");
      });
  };

  const { cartTotals, cartProducts } = props;

  const products = cartProducts.map((p) => {
    return <CartProduct product={p} key={p.id} />;
  });

  return (
    <div className="container">
      <h2>Check Out</h2>
      <div className="checkout-container">
        <div className="checkout-left">
          <h4>Information</h4>
          <input
            type="text"
            className="searchinput"
            placeholder="Name"
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <input
            type="text"
            className="searchinput"
            placeholder="Email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <input
            type="text"
            className="searchinput"
            placeholder="Address"
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
          />
          <div className="stripe-container">
            <CardElement />
          </div>
          <div className="checkout-confirm-btn" onClick={handleConfirm}>
            Confirm & Pay
          </div>
        </div>
        <div className="checkout-right">
          <h4>Cart</h4>
          <div className="float-cart__container">{products}</div>
          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${cartTotals.currencyFormat} ${util.formatPrice(
                  cartTotals.totalPrice,
                  cartTotals.currencyId
                )}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotals.installments && (
                  <span>
                    {`OR UP TO ${cartTotals.installments} x ${
                      cartTotals.currencyFormat
                    } ${util.formatPrice(
                      cartTotals.totalPrice / cartTotals.installments,
                      cartTotals.currencyId
                    )}`}
                  </span>
                )}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartProducts: state.cartProducts.items,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
});

export default connect(mapStateToProps, {
  loadCart,
  updateCart,
  removeProduct,
})(Checkout);
