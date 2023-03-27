import classes from "./History.module.css";
import useHttp from "../../hooks/useHttp";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../utils/constant";
import { Pagination, Skeleton } from "antd";
import Order from "./Order";

function History(props) {
  const { isLoading, sendRequest, cancelRequest } = useHttp();
  const [history, setHistory] = useState([]);
  const [numResult, setNumResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const changePageHandler = (values) => {
    setCurrentPage(values);
  };

  useEffect(() => {
    
    sendRequest(
      { url: `${serverUrl}/history?page=${currentPage}&&pageSize=${pageSize}` },
      (data) => {
        setHistory(data.data);
        setNumResult(data.numResult);
      }
    );
    return () => {
      cancelRequest();
    };
  }, [currentPage]);

  let tableBodyContent;
  if (history.length > 0) {
    tableBodyContent = history.map((order, idx) => {
      return <Order order={order} key={idx} />;
    });
  }
  if (!isLoading && history.length === 0) {
    tableBodyContent = (
      <p className="text-center fs-2 fs-italic">You have no order history!</p>
    );
  }
  return (
    <>
      <table className={classes.history}>
        <thead>
          <tr>
            <th>id order</th>
            <th>id user</th>
            <th>name</th>
            <th>phone</th>
            <th>address</th>
            <th>total</th>
            <th>delivery</th>
            <th>status</th>
            <th>detail</th>
          </tr>
        </thead>
        <tbody>{!isLoading && tableBodyContent}</tbody>
      </table>
      {isLoading && <Skeleton className="mt-2" />}
      {history.length > 0 && (
        <Pagination
          defaultCurrent={1}
          total={numResult}
          pageSize={pageSize}
          onChange={changePageHandler}
          className="d-flex justify-content-end m-3"
        />
      )}
    </>
  );
}

export default History;
