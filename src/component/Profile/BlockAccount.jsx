import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { authActions } from "../../store/authSlice";
import { serverUrl } from "../../utils/constant";

function BlockAccount(props) {
  const id = useSelector((state) => state.auth.token);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const blockAccountHander = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${serverUrl}/user/${id}/account/block`,
        method: "PATCH",
      },
      (data) => {
        setSuccess(true);
        setTimeout(() => {
          dispatch(authActions.logout());
          navigate("/login");
        }, 3000);
      }
    );
  };

  return (
    <form className="p-5 fs-5" onSubmit={blockAccountHander}>
      <p>Are you sure that you want to block your account?</p>
      <p>You can only re-open your account by contact with Adminstrator.</p>

      {!success && (
        <>
          <p className="text-secondary">
            <em>You will be logged out after you block your account.</em>
          </p>
          <button className="btn btn-outline-danger">Block my account</button>
        </>
      )}
      {success && (
        <div className="text-success">
          <p>Your account is now blocked.</p>{" "}
          <p>You will be logged out in 3 seconds!</p>
        </div>
      )}
    </form>
  );
}

export default BlockAccount;
