import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import authApi from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import RegisterUI from "./RegisterUI";
// import useFetch from '../hooks/use-fetch';

const schema = yup.object().shape({
  username: yup
    .string()
    .strict(false)
    .trim("Please enter a valid user name")
    .required("User name is required"),
  name: yup
    .string()
    .strict(false)
    .trim("Please enter a valid name")
    .required("Name name is required"),
  email: yup
    .string()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .strict(false)
    .trim("Please enter password")
    .min(8, "Please enter a valid data")
    .max(20, "Please enter a valid data")
    .required("Please enter a valid data"),
    confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Please enter valid confirm password")
    .required("Please enter a valid data"),
});
// const [data, setData] = useState<any>()

const Register = () => {
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
    console.log(data);

    try {
      setIsLoadingForm(true);
      const res = await authApi.register(data);
      setIsLoadingForm(false);

      // console.log(res);

      localStorage.setItem("access_token", res.token);
      navigate("/home");
    } catch (error) {
      // console.log(error);
        setErrorFormLogin(error?.data?.msg);
      // }
    }
  };

  return (
    <RegisterUI
      submit={submit}
      handleSubmit={handleSubmit}
      control={control}
      formState={formState}
      errorForm={errorFormLogin}
      isLoading={isLoadingForm}
    />
  );
};

export default Register;
