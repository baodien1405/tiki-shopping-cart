import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-controls/InputField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import PasswordField from "components/form-controls/PasswordField";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Please enter your full name")
      .test(
        "should has at least two words",
        "Please enter at least two word.",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters"),
    retypePassword: yup
      .string()
      .required("Please retype your password")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className={classes.title}>
        SIGN UP
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Full name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className={classes.submit}
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
