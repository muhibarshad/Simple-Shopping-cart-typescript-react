import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartItemType } from "../types/cartItemType";
type Props = {
  item: CartItemType;
  addCart: (item: CartItemType) => void;
};
const CartItem: React.FC<Props> = ({ item, addCart }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Category: {item.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="h6">Price: ${item.price}</Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ ml: 12 }}
            variant="contained"
            color="success"
            onClick={() => addCart(item)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItem;
