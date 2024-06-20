import React, { Suspense, lazy } from "react";
import { Box } from "@chakra-ui/react";
import CustomLoader from "../Components/CustomLoader/customLoader";

const Category = lazy(() => import("./giftCardcategory"));
const TopRated = lazy(() => import("./toprated"));
const Recepient = lazy(() => import("./recepient"));
const GiftMain = lazy(() => import("./giftMain"));

export default function Gift() {
  return (
    <Suspense fallback={<div><CustomLoader/></div>}>
      <Box m="100px auto">
        <GiftMain />
        <Category />
        <TopRated />
        {/* <Recepient /> */}
      </Box>
    </Suspense>
  );
}
