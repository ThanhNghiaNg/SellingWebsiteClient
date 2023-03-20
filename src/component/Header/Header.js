import classes from "./Header.module.css";
import Container from "../UI/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.name);
  const [toggleHeader, setToggleHeader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const logoutHandler = () => {
    sendRequest({ url: `${serverUrl}/logout`, method: "POST" }, (data) => {
      dispatch(authActions.logout());
      navigate("/login", { replace: true });
    });
  };

  const toggleHeaderHandler = () => {
    setToggleHeader((prev) => !prev);
  };

  return (
    <div className={classes.header__layout}>
      <Container
        className={`${classes.header} ${
          toggleHeader ? classes.header__responsive : ""
        }`}
      >
        <div className={classes.group}>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : " ")}
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : " ")}
            to="/shop"
          >
            <span className={classes["icon-header"]}>
              <i className="fa-solid fa-shop"></i>
            </span>
            Shop
          </NavLink>
        </div>
        <div className={classes.group}>
          <div className={classes["nav-icon"]}>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : " ")}
              to="/cart"
              end
            >
              <span className={classes["icon-header"]}>
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              Cart
            </NavLink>
          </div>
          <div className={classes["nav-icon"]}>
            {!isLoggedIn && (
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : " ")}
                to="/login"
                end
              >
                Login
              </NavLink>
            )}
          </div>
          <div className={classes["nav-icon"]}>
            {isLoggedIn && (
              <>
                <div className={classes["nav-icon"]}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : " "
                    }
                    to="/history"
                  >
                    <span className={classes["icon-header"]}>
                      <i className="fa-solid fa-receipt"></i>
                    </span>

                    <span className="ms-1 me-2">History</span>
                  </NavLink>
                </div>
                <div className={classes["nav-icon"]}>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? classes.active : " "
                    }
                  >
                    <span className={classes["icon-header"]}>
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <span className="ms-1">{username + " "}</span>
                    <i className="fa fa-caret-down me-2"></i>
                  </NavLink>
                </div>
                <div className={classes["nav-icon"]}>
                  <NavLink
                    to="/login"
                    className={classes.logout}
                    onClick={logoutHandler}
                  >
                    <span className={classes["icon-header"]}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                    (Logout)
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      <button
        onClick={toggleHeaderHandler}
        className={`${classes.button__toggle} btn btn-secondary`}
      >
        {!toggleHeader && <i className="fa-solid fa-chevron-right"></i>}
        {toggleHeader && <i className="fa-solid fa-chevron-left"></i>}
      </button>
    </div>
  );
};

export default Header;

// import AuthContext from "./..";
// import React, { useContext } from "react";

// const ListenedComponent = (props) => {
//   const authCtx = useContext(AuthContext);
//   return <nav>{authCtx.isLoggedIn}</nav>;
// };

// const AuthContext = React.createContext({
//   isLoggedIn: false,
//   login: (email, password) => {},
//   logout: () => {},
// });

// export const AuthProvider = (props) => {
//   const loginHandler = (email, password) => {
//     {logic}
//   };
//   const logoutHandler = (email, password) => {
//     {logic;}
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: false,
//         login: (email, password) => {},
//         logout: () => {},
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// // export default AuthContext

// import AuthProvider from '../'

// <AuthProvider><App/></AuthProvider>
