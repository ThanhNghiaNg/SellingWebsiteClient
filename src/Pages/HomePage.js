import Container from "../component/UI/Container";
import Banner from "../component/Banner/Banner";
import CategoryList from "../component/CategoryList/CategoryList";
import ProductList from "../component/ProductList/ProductList";
import MoreInfo from "../component/MoreInfo/MoreInfo";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";
import { Skeleton } from "antd";

const HomePage = (props) => {
  const {
    isLoading: isLoadingImages,
    sendRequest: getImages,
    cancelRequest: cancelGetImages,
  } = useHttp();
  const {
    isLoading: isLoadingProducts,
    sendRequest: getProducts,
    cancelRequest: cancelGetPeoducts,
  } = useHttp();
  const [imagePaths, setImagePaths] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getImages({ url: `${serverUrl}/images-home` }, (data) => {
      setImagePaths(data);
    });
    getProducts({ url: `${serverUrl}/products-home` }, (data) => {
      setProducts(data);
    });
    return () => {
      cancelGetImages();
      cancelGetPeoducts();
    };
  }, []);
  return (
    <Container>
      {isLoadingImages && <Skeleton active className="my-5" />}
      {!isLoadingImages && (
        <>
          {imagePaths && <Banner bannerSrc={imagePaths.bannerPath} />}
          {imagePaths && (
            <CategoryList categoriesSrc={imagePaths.categoriesPaths} />
          )}
        </>
      )}
      
      {isLoadingProducts && <Skeleton active className="my-5" />}
      {!isLoadingProducts && (
        <ProductList showTitle={true} showAll={true} data={products} />
      )}
      <MoreInfo />
    </Container>
  );
};

export default HomePage;
