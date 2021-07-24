import { Badge, Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Close } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { cartItemsCountSelector } from "features/Cart/selectors";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import { hideMiniCart } from "features/Cart/cartSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
}));

const MODE = {
  REGISTER: "register",
  LOGIN: "login",
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItemCount = useSelector(cartItemsCountSelector);
  // const showCart = useSelector((state) => state.cart.showMiniCart);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  const handleCartClick = () => {
    history.push("/cart");
  };

  // const handleRecipeClick = () => {
  //   history.push("/cart");
  //   dispatch(hideMiniCart());
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              SHOP BAO DIEN
            </Link>
          </Typography>
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      {/* <Menu
        anchorEl={showCart}
        keepMounted
        open={showCart}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>
          <CheckCircleIcon style={{ color: "green" }} />
          Thêm vào giỏ hàng thành công!
        </MenuItem>
        <MenuItem onClick={handleRecipeClick}>
          <Button variant="contained" color="secondary">
            Xem giỏ hàng và thanh toán
          </Button>
        </MenuItem>
      </Menu> */}

      <Dialog
        // disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton}>
          <Close onClick={handleClose} />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here!!!
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here!!!
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
