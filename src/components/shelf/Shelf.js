import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import { addProduct } from "../../store/actions/floatCartActions";

import Product from "./Product";
import ShelfHeader from "./ShelfHeader";
import Clearfix from "../Clearfix";
import Spinner from "../Spinner";
import FloatCart from "../floatCart/FloatCart";

class Shelf extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    const { filter } = this.props;

    this.handleFetchProducts(filter);
  }

  componentWillReceiveProps(nextProps) {
    const { filter: nextFilter } = nextProps;

    if (nextFilter !== this.props.filter) {
      this.handleFetchProducts(nextFilter, undefined);
    }
  }

  handleFetchProducts = (filter = this.props.filter) => {
    this.setState({ loading: true });
    this.props.fetchProducts(filter, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { products } = this.props;

    const p = products.map((p) => {
      return (
        <Product product={p} addProduct={this.props.addProduct} key={p.id} />
      );
    });

    return (
      <React.Fragment>
        {this.state.loading && <Spinner />}
        <div className="container">
          <ShelfHeader productsLength={products.length} />
          {p}
          <Clearfix />
        </div>
        <Clearfix />
        <FloatCart />
      </React.Fragment>
    );
  }
}

Shelf.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

const mapStateToProps = (state) => ({
  products: state.products.items,
  filter: state.filter.item,
});

export default connect(mapStateToProps, { fetchProducts, addProduct })(Shelf);
