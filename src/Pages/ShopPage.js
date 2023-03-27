import Container from "../component/UI/Container";
import BannerFrame from "../component/Banner/BannerFrame";
import ProductList from "../component/ProductList/ProductList";
import Sidebar from "../component/Sidebar/Sidebar";
import FilterBar from "../component/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../store/products";
import { Skeleton } from "antd";

const ShopPage = (props) => {
  // const [products, setProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const { sendRequest, isLoading, cancelRequest } = useHttp();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (products.length === 0) {
      sendRequest({ url: `${serverUrl}/products` }, (data) => {
        // setProducts(data);
        dispatch(productsActions.changeProducts(data));
        dispatch(productsActions.setAllProducts(data));
      });
    }
    return () => {
      cancelRequest();
    };
  }, []);
  return (
    <Container>
      <BannerFrame pageName="Shop" />
      {isLoading && <Skeleton />}
      {!isLoading && (
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col">
            <FilterBar></FilterBar>
            <ProductList
              numCols="4"
              showTitle={false}
              itemToDetail={true}
              data={products}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShopPage;
