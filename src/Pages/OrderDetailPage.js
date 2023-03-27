import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetail from "../component/OrderDetail/OrderDetail";
import Container from "../component/UI/Container";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

function OrderDetailPage(props) {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const { sendRequest, isLoading, cancelRequest } = useHttp();

  useEffect(() => {
    window.scrollTo(0, 0);
    sendRequest({ url: `${serverUrl}/order/${id}` }, (data) => {
      setOrder(data);
    });
    return cancelRequest;
  }, [id]);

  return (
    <Container>
      {isLoading && <Skeleton />}
      {order && <OrderDetail order={order} />}
      {!isLoading && !order && (
        <p className="text-center fs-3">Not found Order</p>
      )}
    </Container>
  );
}

export default OrderDetailPage;
