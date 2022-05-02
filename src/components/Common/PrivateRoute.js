import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({children}) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (isLoggedIn) {
      setIsLogin(isLoggedIn);
    }
  }, []);

  if (!isLogin) return <Redirect to="/login" />;

  return children;
}
