import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import categoryApi from "api/categoryApi";
import CategorySkeletonList from "./CategorySkeletonList";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all 0.25s linear",

      "&:hover": {
        color: theme.palette.primary.dark,
        cursor: "pointer",
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const categories = await categoryApi.getAll();
        setCategoryList(
          categories.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        );
      } catch (error) {
        console.log("Failed to fetch category list: ", error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <CategorySkeletonList length={6} />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
