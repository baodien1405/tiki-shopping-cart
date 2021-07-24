import React from "react";
import PropTypes from "prop-types";
import { Box, Chip, makeStyles } from "@material-ui/core";
import { useMemo } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",

    margin: theme.spacing(2, 0),
    padding: 0,
    listStyleType: "none",

    "& > li": {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => `Giao hàng miễn phí`,
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => `Có khuyến mãi`,
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      filters.hasOwnProperty("salePrice_gte") &&
      filters.hasOwnProperty("salePrice_lte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => {
      if (filters["category.id"]) {
        console.log(typeof filters["category.id"]);
        switch (filters["category.id"]) {
          case "1": {
            return "Thời trang";
          }
          case "2": {
            return "Khẩu trang";
          }
          case "3": {
            return "Làm đẹp";
          }
          case "4": {
            return "Laptop";
          }
          case "5": {
            return "Ổ cứng";
          }
          default: {
            return "Điện thoại";
          }
        }
      } else {
        return null;
      }
    },
    isActive: () => true,
    isVisible: (filters) => filters.hasOwnProperty("category.id"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters["category.id"];
      return newFilters;
    },
    onToggle: () => {},
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter(
      (x) => x.isVisible(filters) && x.getLabel(filters)
    );
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
            size="small"
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
