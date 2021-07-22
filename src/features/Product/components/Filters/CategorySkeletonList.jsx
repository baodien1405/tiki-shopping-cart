import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

CategorySkeletonList.propTypes = {
  length: PropTypes.number,
};

CategorySkeletonList.defaultProps = {
  length: 6,
};

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > .menuItem": {
      marginTop: theme.spacing(1),
    },
  },
}));

function CategorySkeletonList({ length }) {
  const classes = useStyles();

  return (
    <ul className={classes.menu}>
      {Array.from(new Array(length)).map((x, index) => (
        <Skeleton width="40%" className={classes.menuItem} key={index} />
      ))}
    </ul>
  );
}

export default CategorySkeletonList;
