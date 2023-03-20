import classes from "./UserInfo.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import { Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

function UserInfo(props) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const { error, isLoading, sendRequest } = useHttp();
  const [success, setSuccess] = useState(null);
  const id = useSelector(state=>state.auth.token)
  const onFinish = (values) => {
    sendRequest(
      { url: `${serverUrl}/user/${id}`, method: "PUT", body: JSON.stringify(values) },
      (data) => {
        setSuccess(data.message);
        dispatch(authActions.changeName(values.fullName));
      }
    );
  };

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/user/${id}` }, (data) => {
      formRef.current.setFieldsValue(data);
    });
  }, []);
  return (
    <Form
      ref={formRef}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      className="mt-5"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your full name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {isLoading && <Progress percent={75} size="small" status="active" />}
        {!isLoading && success && <p className="text-success">{success}</p>}
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserInfo;
