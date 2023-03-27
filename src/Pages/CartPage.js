import Container from "../component/UI/Container";
import BannerFrame from "../component/Banner/BannerFrame";
import Cart from "../component/Cart/Cart";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";
import { Skeleton } from "antd";

const CartPage = (props) => {
  const [cart, setCart] = useState([]);
  const { sendRequest, cancelRequest, isLoading } = useHttp();
  const [onLoad, setonLoad] = useState(false);
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/cart` }, (data) => {
      setCart(data.items);
    });
    return cancelRequest;
  }, [onLoad]);
  const onLoadHandler = () => {
    setonLoad((prev) => !prev);
  };
  return (
    <Container>
      <BannerFrame pageName="Cart" />
      {isLoading && <Skeleton />}
      {!isLoading && <Cart cart={cart} onLoad={onLoadHandler} />}
    </Container>
  );
};

export default CartPage;
