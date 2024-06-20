import { Box, Image, keyframes } from "@chakra-ui/react";
import React from "react";

// Define the keyframes for the rotation animation
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Custom Loader Component
function CustomLoader() {
    return (
      <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 0.8)" // Optional: semi-transparent background
      zIndex="1000" // Ensure the loader is above other content
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="250px"
        height="250px"
        borderRadius="50%" // Making the container circular
        overflow="hidden" // Ensure the image does not overflow the circular container
        animation={`${rotate} 4s linear infinite`} // Applying the rotation animation
      >
         <Image
          src="https://i.pinimg.com/564x/9b/fc/da/9bfcdadd32dc93fae29b78af252e9f34.jpg"
          alt="Loading"
          boxSize="250px" // Ensuring the image fits the circular container
          objectFit="cover" // Ensuring the image covers the entire container
        />
      </Box>
    </Box>
  
  );
}

export default CustomLoader;
