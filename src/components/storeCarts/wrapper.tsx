import { Container } from "@mui/system";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Container sx={{ width: "600px" }}>{children}</Container>
    </>
  );
};
