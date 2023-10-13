import Category from "./giftCardcategory";
import TopRated from "./toprated";
import Recepient from "./recepient";
import { Box } from "@chakra-ui/react";
import GiftMain from "./giftMain";


export default function Gift(){
return(
    <Box m="100px auto">
    <GiftMain/>
        <Category/>
<TopRated/>
<Recepient/>
    </Box>
)
}