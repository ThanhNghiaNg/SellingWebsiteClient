import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetail from "../component/OrderDetail/OrderDetail";
import Container from "../component/UI/Container";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

function OrderDetailPage(props) {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const { sendRequest, isLoading } = useHttp();
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/order/${id}` }, (data) => {
      console.log(data);
      setOrder(data);
    });
  }, [id]);
  return (
    <Container>
      {order && <OrderDetail order={order} />}
      {!isLoading && !order && (
        <p className="text-center fs-3">Not found Order</p>
      )}
    </Container>
  );
}

export default OrderDetailPage;
