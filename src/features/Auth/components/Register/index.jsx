import React from "react";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import { unwrapResult } from "@reduxjs/toolkit";

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      // do something here on register successfully
      enqueueSnackbar("Register successfully!!!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log("Failed to register: ", error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
