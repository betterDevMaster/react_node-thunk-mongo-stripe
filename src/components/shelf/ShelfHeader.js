import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Clearfix from "../Clearfix";
import { updateFilter } from "../../store/actions/filterActions";

class ShelfHeader extends Component {
  handleFilter = (e) => {
    this.props.updateFilter(e.target.value);
  };

  render() {
    return (
      <div className="shelf-container-header">
        <h2>Browse the Catalogue</h2>
        <input
          type="text"
          placeholder="Search for title..."
          className="searchinput"
          onChange={this.handleFilter}
        />
        <Clearfix />
      </div>
    );
  }
}

ShelfHeader.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter.item,
});

export default connect(mapStateToProps, { updateFilter })(ShelfHeader);
