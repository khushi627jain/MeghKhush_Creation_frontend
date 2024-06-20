import React, { Suspense, lazy } from "react";
import { Box } from "@chakra-ui/react";

const Category = lazy(() => import("./giftCardcategory"));
const TopRated = lazy(() => import("./toprated"));
const Recepient = lazy(() => import("./recepient"));
const GiftMain = lazy(() => import("./giftMain"));

export default function Gift() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box m="100px auto">
        <GiftMain />
        <Category />
        <TopRated />
        <Recepient />
      </Box>
    </Suspense>
  );
}
