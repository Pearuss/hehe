import { Button, TextField, Typography } from "@mui/material";
import React from "react";

import { Controller } from "react-hook-form";

function RegisterUI({
  submit,
  errorForm,
  handleSubmit,
  control,
  formState,
  isLoading,
}) {
  const { errors } = formState;
  return (
    <div
      style={{
        backgroundImage: `url("/bg-login-page.jpg")`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
      <div className="flex items-center justify-center w-full h-full">
        <form
          onSubmit={handleSubmit(submit)}
          style={{
            background: `#D3E2E3`,
            backgroundImage: `linear-gradient(
          to top,
          rgba(211, 226, 227, 0.8) 0,
          rgba(211, 226, 227, 0) 60%,
          rgba(211, 226, 227, 0.8) 100%
        )`,
          }}
          className="w-[500px] h-[560px] box-border bg-transparent px-16 py-10 rounded-md"
        >
          <Typography
            color="primary"
            className="mb-12 font-medium"
            variant="h4"
          >
            Register
          </Typography>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  sx={{
                    // input: { height: "14px !important" },
                    marginBottom: 3,
                  }}
                  // type={"email"}
                  error={!!errors.username}
                  variant="outlined"
                  size="small"
                  label={errors.username?.message || "User name"}
                  placeholder="Enter your username"
                  color="primary"
                  // size="medium"
                  fullWidth
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  sx={{
                    // input: { height: "14px !important" },
                    marginBottom: 3,
                  }}
                  // type={"email"}
                  error={!!errors.name}
                  variant="outlined"
                  size="small"
                  label={errors.name?.message || "Name"}
                  placeholder="Enter your name"
                  color="primary"
                  // size="medium"
                  fullWidth
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  sx={{
                    // input: { height: "14px !important" },
                    marginBottom: 3,
                  }}
                  // type={"email"}
                  error={!!errors.email}
                  variant="outlined"
                  size="small"
                  label={errors.email?.message || "Email"}
                  placeholder="Enter your email"
                  color="primary"
                  // size="medium"
                  fullWidth
                  {...field}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                sx={{
                  // input: { height: "14px !important" },
                  marginBottom: 3,
                }}
                type="password"
                variant="outlined"
                size="small"
                label={errors.password?.message || "Password"}
                placeholder="Enter your password"
                color="primary"
                error={!!errors.password}
                // size="medium"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                // sx={{ input: { height: "14px !important" } }}
                type="password"
                variant="outlined"
                size="small"
                label={errors.confirm_password?.message || "Confirm password"}
                placeholder="Enter your confirm_password"
                color="primary"
                error={!!errors.confirm_password}
                // size="medium"
                fullWidth
                {...field}
              />
            )}
          />

          {/* <Link href="/auth/forgot-password">
            <Typography
              variant="h6"
              component="span"
              align="right"
              className="flex ml-auto w-max mt-2 text-sm tracking-wider cursor-pointer text-grayLightText"
            >
              Need help?
            </Typography>
          </Link> */}
          <Button
            className="w-full mt-8 shadow-customLogin font-medium text-white opacity-80  bg-[#1976D2]  mx-auto rounded-full py-3 px-3 tracking-wider active:animate-jelly"
            type="submit"
          >
            Login
          </Button>

          {/* <ButtonLoading
            className="w-full mt-8 shadow-customLogin font-medium  bg-[#1976D2]  mx-auto rounded-full py-3 px-3 tracking-wider active:animate-jelly"
            messageLoading="Processing..."
            isLoading={isLoading}
            variant="contained"
            type="submit"
          >
            Sign in
          </ButtonLoading> */}
        </form>
      </div>
    </div>
  );
}

export default RegisterUI;
