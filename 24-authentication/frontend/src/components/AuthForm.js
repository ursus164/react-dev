// import { useState } from 'react';
import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDebugValue, useEffect, useState } from "react";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("action") === "login";
  const action = searchParams.get("action");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (!action) {
      // if not present
      queryParams.set("action", "login");
      navigate(`${location.pathname}?${queryParams.toString()}`);
    }
  }, [action,location.pathname,navigate,location.search]);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?action=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
