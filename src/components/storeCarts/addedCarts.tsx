import { Container } from "@mui/system";
import { CartItemType } from "../types/cartItemType";
import AddedCartItem from "./addedCartItem";
import { Wrapper } from "./wrapper";
import Typography from "@mui/material/Typography";

type Props = {
  cartItems: CartItemType[];
  totalPrice: number;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};

const AddedCarts: React.FC<Props> = ({
  cartItems,
  totalPrice,
  addToCart,
  removeFromCart,
}) => {
  if (cartItems.length === 0) {
    return (
      <Wrapper>
        <h2>No cart items yet</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {cartItems.map((item: CartItemType) => (
        <AddedCartItem
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          key={item.id}
          cartItem={item}
        />
      ))}
      <Container sx={{ mt: 2, ml: 14 }}>
        <Typography component="div" variant="h5">
          Total Price : ${totalPrice.toFixed(2)}
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default AddedCarts;
