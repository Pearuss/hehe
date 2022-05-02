import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import LoginUI from "./LoginUI";
import authApi from "../../services/authApi";
import { useNavigate } from "react-router-dom";
// import useFetch from '../hooks/use-fetch';

const schema = yup.object().shape({
  // email: yup.string().required().email("Please enter a valid email"),
  username: yup.string().required(),
  password: yup.string().min(6).max(20).required(),
});
// const [data, setData] = useState<any>()

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const [errorFormLogin, setErrorFormLogin] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const submit = async (data, event) => {
    event.preventDefault();
    // console.log(data);

    try {
      setIsLoadingForm(true);
      const res = await authApi.login(data);
      setIsLoadingForm(false);

      // console.log(res);

      localStorage.setItem("access_token", res.token);
      navigate("/")
    } catch (error) {
      console.log(error);
      //   setErrorFormLogin('Server not response');
      // }
    }
  };

  return (
    <LoginUI
      submit={submit}
      handleSubmit={handleSubmit}
      control={control}
      formState={formState}
      errorForm={errorFormLogin}
      isLoading={isLoadingForm}
    />
  );
};

export default Login;
