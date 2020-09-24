import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    let itemNum = this.props.itemLength;
    let pageSize = this.props.pageLength;
    let pageCount = Math.ceil(itemNum / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <span
              className="page-link"
              onClick={() => this.props.onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}
export default Pagination;
