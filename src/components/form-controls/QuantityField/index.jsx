import { Box, FormHelperText, makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    maxWidth: "200px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },
}));

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { control, formState, setValue } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <FormControl
      error={!!hasError}
      fullWidth
      margin="normal"
      variant="outlined"
      size="small"
    >
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(
                  field.name,
                  Number.parseInt(field.value)
                    ? Number.parseInt(field.value) - 1
                    : 1
                )
              }
            >
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              {...field}
              id={name}
              type="number"
              disabled={disabled}
            />

            <IconButton
              onClick={() =>
                setValue(
                  field.name,
                  Number.parseInt(field.value)
                    ? Number.parseInt(field.value) + 1
                    : 1
                )
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
