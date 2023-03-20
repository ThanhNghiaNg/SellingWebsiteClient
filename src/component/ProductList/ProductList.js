import React, { useState, useEffect } from "react";
import __classes from "../CategoryList/CategoryList.module.css";
import classes from "./ProductList.module.css";
import ProductItem from "./ProductItem";

import { serverUrl } from "../../utils/constant";

// define URL
export const URL = `${serverUrl}/products-home`;

// ProductList Component - for render grid of Products
const ProductList = React.memo((props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for status if is loading
  let numCols = props.numCols ? Number(props.numCols) : 4; // Determine the number of columns on grid to display products (default is 4)
  if (isSmallScreen) {
    numCols = 2;
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsSmallScreen(mediaQuery.matches);

    // Add a listener to update the state when the screen size changes
    const updateIsSmallScreen = (event) => setIsSmallScreen(event.matches);
    mediaQuery.addListener(updateIsSmallScreen);

    // Remove the listener when the component unmounts
    return () => mediaQuery.removeListener(updateIsSmallScreen);
  }, []);

  let data = props.data;

  let contentProducts = []; // keep the content of display products to render

  if (data.length > 0) {
    for (let i = 0; i < data.length / numCols; i++) {
      // Split the display data to smaller chunks, one chunks (for one row) have no more than numCols element
      const chunkProucts = data
        .slice(i * numCols, i * numCols + numCols)
        .map((product) => {
          return (
            <div className="col" key={product.name}>
              <ProductItem product={product} toDetail={props.itemToDetail} />
            </div>
          );
        });

      // Add more empty columns to keep the grid structure
      while (chunkProucts.length % numCols !== 0) {
        chunkProucts.push(<div className="col" key={Math.random()}></div>);
      }

      // Push each chunks to the contentProducts to display
      contentProducts.push(
        <div className="row" key={Math.random()}>
          {chunkProucts}
        </div>
      );
    }
  }

  return (
    <div className={classes["product-list"]}>
      {props.showTitle && (
        <div className={__classes.header}>
          <h5>make the hard way</h5>
          <h3>top trending products</h3>
        </div>
      )}
      {/* Show mode Loading or contentProduct when finish loading */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="d-grid gap-4">{contentProducts}</div>
      )}
    </div>
  );
});

export default ProductList;
