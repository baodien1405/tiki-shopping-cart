import React from "react";
import { useDispatch } from "react-redux";
import { login } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";
import LoginForm from "../LoginForm";

Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log("Failed to login: ", error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
