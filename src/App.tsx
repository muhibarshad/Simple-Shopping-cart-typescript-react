import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import CartItem from "./components/cart/cartItem";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddedCarts from "./components/storeCarts/addedCarts";
import { CartItemType } from "./components/types/cartItemType";

const getProducts = async () =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const { data, isLoading, isError } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (data) {
      data.forEach((obj) => (obj.amount = 0));
    }
  }, [data]);
  const handleAddToCart = (item: CartItemType) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : cartItem
      );
      setTotalPrice(totalPrice + existingItem.price);
      setCartItems(updatedCartItems);
    } else {
      item.amount = 1;
      setTotalPrice(totalPrice + item.price);
      setCartItems([...cartItems, item]);
    }
  };
  const handleRemoveFromCart = (item: CartItemType) => {
    if (item.amount === 1) {
      item.amount = 0;
    } else {
      item.amount -= 1;
    }
    setTotalPrice(totalPrice - item.price);
    const filteredCartItems = cartItems.filter(
      (cartItem) => cartItem.amount !== 0
    );
    setCartItems(filteredCartItems);
  };
  const handleTotalItems = (cartItems: CartItemType[]) => {
    let totalCarts: number = 0;
    cartItems.forEach((item) => {
      totalCarts += item.amount;
    });
    return totalCarts;
  };

  if (isLoading)
    return (
      <>
        <Container sx={{ mt: 50, ml: 100 }}>{<CircularProgress />}</Container>
      </>
    );
  if (isError) return <>{<h1>Something Went wrong</h1>}</>;
  return (
    <>
      <>
        <Drawer
          anchor="left"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <AddedCarts
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            totalPrice={totalPrice}
            cartItems={cartItems}
          />
        </Drawer>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={handleTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        <Container>
          <Grid container spacing={3}>
            {data?.map((cartData: CartItemType) => (
              <Grid item lg={4} sm={12} md={6}>
                <CartItem
                  key={cartData.id}
                  item={cartData}
                  addCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    </>
  );
};

export default App;
