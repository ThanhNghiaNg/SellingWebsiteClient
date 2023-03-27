import classes from "./UserPassword.module.css";
import { Button, Form, Input, Progress, Spin } from "antd";
import React, { useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import { useSelector } from "react-redux";

function UserPassword(props) {
  const { error, isLoading, sendRequest } = useHttp();
  const [success, setSuccess] = useState(null);
  const formRef = useRef();
  const id = useSelector((state) => state.auth.token);
  const onFinish = (values) => {
    setSuccess("");
    sendRequest(
      {
        url: `${serverUrl}/user/${id}/password/change`,
        method: "PATCH",
        body: JSON.stringify(values),
      },
      (data) => {
        formRef.current.setFieldsValue({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    );
  };
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
        label="Old Password"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your confirm password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {isLoading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {!isLoading && success && <p className="text-success">{success}</p>}
        {!isLoading && error && <p className="text-danger">{error}</p>}
        <Button type="primary" htmlType="submit">
          Change
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserPassword;
