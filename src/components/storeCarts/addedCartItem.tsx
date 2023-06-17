import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { CartItemType } from "../types/cartItemType";
import { Grid } from "@mui/material";

type Props = {
  cartItem: CartItemType;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};

const AddedCartItem: React.FC<Props> = ({
  cartItem,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Card sx={{ display: "flex", mt: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {cartItem.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Price: ${cartItem.price}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={6} lg={6} sm={12}>
              <Button
                variant="contained"
                color="success"
                onClick={() => addToCart(cartItem)}
              >
                Add to cart
              </Button>
            </Grid>
            <Grid item md={6} lg={6} sm={12}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(cartItem)}
              >
                Remove
              </Button>
            </Grid>
            <Grid item md={12} lg={12} sm={12} sx={{ ml: 16 }}>
              <Button color="secondary">{cartItem.amount}</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={cartItem.image} />
    </Card>
  );
};

export default AddedCartItem;
