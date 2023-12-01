import { Link } from "react-router-dom";
import { useShoppingCart } from "../../services/context/ShoppingCart";
import { Badge, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./styles.module.css";

const Navbar = () => {
  const { cartItems } = useShoppingCart();

  return (
    <AppBar position="static">
      <Toolbar className={styles.container}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sopping website
        </Typography>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/categories" className={styles.link}>
          Categories
        </Link>
        <Link to="/shopping-cart" className={styles.link}>
          <IconButton color="inherit">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
