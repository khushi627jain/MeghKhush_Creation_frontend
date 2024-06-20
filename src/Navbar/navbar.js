import {
  Heading, Input, Tooltip, Popover,
  PopoverTrigger, PopoverContent,  PopoverHeader, PopoverBody, Text,PopoverFooter,PopoverArrow,
  PopoverCloseButton, Button, ButtonGroup, Box,Stack,InputGroup,InputLeftAddon,InputRightAddon,Select,Textarea,
  PopoverAnchor,useToast,Drawer, DrawerBody,DrawerFooter,  DrawerHeader, DrawerOverlay,DrawerContent,DrawerCloseButton,
 Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Spacer, useDisclosure, Center, CheckboxIcon
} from "@chakra-ui/react";
import './navbar.css'

import {IoIosArrowForward} from "react-icons/io"
import React, { useEffect, useRef, useState } from "react";
import { MdReviews } from "react-icons/md"
import { GoCodeReview } from "react-icons/go"
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import {GiHamburgerMenu} from "react-icons/gi" 
import {MdOutlineSubject} from "react-icons/md"
import { MdOutlineCheckCircle } from "react-icons/md";

export default function Navbar() {



  const initialFocusRef = React.useRef()
const navigate=useNavigate();
const dispatch=useDispatch()
const toast = useToast()

  const [isOpenBox, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const[name,setName]=useState("")
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const[userName,setUsername]=useState("");
  const[searchValue,setSearchValue]=useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[isOpenLoginBox,setIsOpenLoginBox]=useState(false)
  const[showPd,setShowPd]=useState(false)
  const[pdvalid,setPdValid]=useState([false,false,false,false,false])

  const firstField = React.useRef()

  const passwordValidationMessages = [
    'Password should be at least 8 characters long.',
    'Password should contain at least one uppercase letter.',
    'Password should contain at least one lowercase letter.',
    'Password should contain at least one digit.',
    'Password should contain at least one special character (!#$%"&*)',
  ];
  

useEffect(()=>{
  
  const token=localStorage.getItem("token")
  if(token){
    axios
    .get("https://megh-khush-creation.vercel.app/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res=>{
      dispatch({ type: "setName", payload: res.data.data.name })
      setUsername(res.data.data.name);
    })
  }
 
},[userName])

  const handleOpenLogin = () => {
    setIsOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
  };

  const handleSubmitLogin = (event,em,pd) => {
    if(event) {
       event.preventDefault(); 
    }
    
 
        const formData = {
            email: em,
            password: pd,
        };
        if (em === "" || pd === "") {
            alert("Please fill all fields");return;
          }
          
        axios.post("https://megh-khush-creation.vercel.app/login",formData)
        .then(res=>{
       
            if(res.status==204){
             
                toast({
        
                  duration: 4000,
                  isClosable: true,
                  position:"top",
                  render:()=>(
                    <Box
                    style={{
                      backgroundColor: '#333f48', // New background color
                      color: 'white', // New text color
                      borderRadius: '10px', // New border radius
                      padding: '15px 25px',
                      fontStyle:"revert-layer",
                      justifyContent:"center",
                      textAlign:"center",
                      margin:"auto",
                      alignItems:"center"
                    }}
                  >
                  Signup first, this email dosen't exist
                  </Box>
                )
                })
              
            }
            else if(res.status==203){
              toast({
        
                duration: 4000,
                isClosable: true,
                position:"top",
                render:()=>(
                  <Box
                  style={{
                    backgroundColor: '#333f48', // New background color
                    color: 'white', // New text color
                    borderRadius: '10px', // New border radius
                    padding: '15px 25px',
                    fontStyle:"revert-layer",
                    justifyContent:"center",
                    textAlign:"center",
                    margin:"auto",
                    alignItems:"center"
                  }}
                >
                Invalid Credentials
                </Box>
              )
              })
            
            }
            else if(res.status==200){
                localStorage.setItem("token",res.data.token);
                toast({
        
                  duration: 4000,
                  isClosable: true,
                  render:()=>(
                    <Box
                    style={{
                      backgroundColor: '#fa4a6f', // New background color
                      color: 'white', // New text color
                      borderRadius: '10px', // New border radius
                      padding: '15px 25px',
                      fontStyle:"revert-layer",
                      justifyContent:"center",
                      textAlign:"center",
                      margin:"auto"
                    }}
                  >
                    SUCCESSFULLY LOGIN
                  </Box>
                )
                })
                axios
                .get("https://megh-khush-creation.vercel.app/user", {
                  headers: { Authorization: `Bearer ${res.data.token}` },
                })
                .then(res=>{
                    setUsername(res.data.data.name)
                })
               
            
            }})
            
            setName("")
            setEmail("")
             setPassword("")
             setLoginEmail("")
             setLoginPassword("")

    handleCloseLogin();
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    // handleOpenLogin()
    setIsOpen(false);
    setShowPd(false)
  };
 const handleLoginFromSIgnUp = () => {
    handleOpenLogin()
    setIsOpen(false);
    setShowPd(false)
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only update the state if the value is numeric and up to 10 digits long
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phone,
  };
  let pdAnswer=pdvalid[0]&&pdvalid[1]&&pdvalid[2]&&pdvalid[3]&&pdvalid[4]
  if(!pdAnswer){
    alert("Please write valid password");return;
  }
  if (email === "" || password === ""||name===""||phone===""||!pdAnswer) {
      alert("Please fill all fields");return;
    }
  axios.post("https://megh-khush-creation.vercel.app/signup",formData)
    .then(res => {

      if(res.data=="Email already exists"){
        toast({
        
          duration: 4000,
          isClosable: true,
          position:"top",
          render:()=>(
            <Box
            style={{
              backgroundColor: '#333f48', // New background color
              color: 'white', // New text color
              borderRadius: '10px', // New border radius
              padding: '15px 25px',
              fontStyle:"revert-layer",
              justifyContent:"center",
              textAlign:"center",
              margin:"auto",
              alignItems:"center"
            }}
          >
          Email already exists
          </Box>
        )
        })  
      }
      else 
      {
        // toast({       
        //   duration: 4000,
        //   isClosable: true,
        //   render:()=>(
        //     <Box
        //     style={{
        //       backgroundColor: '#fa4a6f', // New background color
        //       color: 'white', // New text color
        //       borderRadius: '10px', // New border radius
        //       padding: '15px 25px',
        //       fontStyle:"revert-layer",
        //       justifyContent:"center",
        //       textAlign:"center",
        //       margin:"auto"
        //     }}
        //   >
        //     SUCCESSFULLY SIGNUP
        //   </Box>
        // )
        // })
    
        setLoginEmail(email)
        setLoginPassword(password)
        handleSubmitLogin(undefined,email,password)
      }
     
      
      })
      .catch(err=>console.log(err))
      setEmail("");setPassword("");setPhone("");    



    handleClose();
   
   
  };

  function basketHandel(){
    let token=localStorage.getItem("token")
    if(token) navigate("/cart")
    else {
      toast({
        
        duration: 4000,
        isClosable: true,
        position:"top",
        render:()=>(
          <Box
          style={{
            backgroundColor: '#333f48', // New background color
            color: 'white', // New text color
            borderRadius: '10px', // New border radius
            padding: '15px 25px',
            fontStyle:"revert-layer",
            justifyContent:"center",
            textAlign:"center",
            margin:"auto",
            alignItems:"center"
          }}
        >
        Please login for accessing the cart products
        </Box>
      )
      })
    
      handleOpenLogin()
    }
  }

  function wishlistHandel(){
    let token=localStorage.getItem("token")
    if(token) navigate("/wishlist")
    else {
      toast({
        
        duration: 4000,
        isClosable: true,
        position:"top",
        render:()=>(
          <Box
          style={{
            backgroundColor: '#333f48', // New background color
            color: 'white', // New text color
            borderRadius: '10px', // New border radius
            padding: '15px 25px',
            fontStyle:"revert-layer",
            justifyContent:"center",
            textAlign:"center",
            margin:"auto",
            alignItems:"center"
          }}
        >
        Please login first for accessing the wishlist products
        </Box>
      )
      })
    
      handleOpenLogin()
    }
  }

function logOut(){
  localStorage.removeItem("token");setUsername("");
 
        toast({
        
          duration: 4000,
          isClosable: true,
          render:()=>(
            <Box
            style={{
              backgroundColor: '#fa4a6f', // New background color
              color: 'white', // New text color
              borderRadius: '10px', // New border radius
              padding: '15px 25px',
              fontStyle:"revert-layer",
              justifyContent:"center",
              textAlign:"center",
              margin:"auto"
            }}
          >
           You have been successfully logout.
          </Box>
        )
        })
        setIsOpenLoginBox(false);
  
}

function search(){

  
  navigate(`/search/${searchValue}`)
  setSearchValue("")

} 

function passwordValidation(){
setShowPd(true)
}

function setAllPasswordValidation(val){
  setPassword(val)
  let arr=pdvalid;let upperCaseCheck=false;
   let lowerCaseCheck=false; let digitCheck=false;let specialCharCheck=false;
  for(let i=0;i<val.length;i++){
    let a=val.charCodeAt(i);
    if(a>=65&&a<=90){ //uppercase
      upperCaseCheck=true;
    }
    if(a>=97&&a<=122){ //lowercase
       lowerCaseCheck=true
    }
    if(a>=48&&a<=57){
      digitCheck=true;
    }
    if(a>=33&&a<=47){
      specialCharCheck=true;
    }
  }
 arr[0]= val.length>=8?true:false
 arr[1] = upperCaseCheck;
 arr[2]=lowerCaseCheck
 arr[3]=digitCheck
 arr[4]=specialCharCheck

 setPdValid(arr)
 

}

// function googleVerification(){
 
// 		window.open(
// 			`https://meghkhushcreation.netlify.app/auth/google/callback`,
// 			"_self"
//     )
// }

  return (
    <>
<Box className="navbar-new" >
      <Box className="navbar"  >
        <Box gap={["5px","20px","0px"]} className="navbar-1">
          <Box className="logo-etsy">
            <Heading cursor={"pointer"} color="#fa4a6f" onClick={()=>navigate("/")} fontFamily={"cursive"}
             fontSize={["2xl","4xl"]} >
             MeghKhush</Heading>
          </Box>
          <Box display={['none','none','flex']} className="searchBar">
            <Box className="search-input-box">
              <Input onKeyPress={(e)=>{if(e.key=="Enter") search()}} value={searchValue}
               onChange={(e)=>setSearchValue(e.target.value)} border={"none"}
                _focus={{ boxShadow: 'none', }} _hover={{ border: 'none' }} 
                placeholder="Search for anything" />
            </Box>
            <Box className="search-logo" >
              <i onClick={search} class="fa-solid fa-magnifying-glass"></i>
            </Box>
          </Box>
          <Spacer display={["block","block","none"]}/>
          <Tooltip hasArrow label='Favourites' bg='#333f48' p="10px"
           borderRadius={"10px"} color='white'>
            <Box onClick={wishlistHandel} className="favourite">
              <i id="navbar-logo" class="fa-regular fa-heart"></i>
            </Box>
          </Tooltip>

          <Box className="updates">
            <Tooltip hasArrow label='Updates' bg='#333f48' p="10px"
             borderRadius={"10px"} color='white'>
              <i id="navbar-logo" class="fa-sharp fa-regular fa-bell"></i>
            </Tooltip>

            <Popover pt="10px" pb="70px">
              <PopoverTrigger>
                <i class="fa-solid fa-caret-down"></i>
              </PopoverTrigger>
              <PopoverContent bg='white' color='black' pt="10px" pb="70px" outline={"none"}>
                <PopoverHeader fontWeight='semibold'>Updates</PopoverHeader>
                <PopoverArrow bg='white' />
                {/* <PopoverCloseButton bg='purple.500' /> */}
                <PopoverBody pt="10px" pb="10px" textAlign={"left"} bg="#f4f4f4"
                 _hover={{ bg: "#d4d4d4", border: "none" }} border="none">
                  <Text>Your first update!</Text>
                  Look here for updates on items and shops you've favourited – sales, new products and more.
                </PopoverBody>
              </PopoverContent>
            </Popover>


          </Box>


          <Box className="account">
            <Tooltip hasArrow label='Your Account' bg='#333f48' p="10px" 
            borderRadius={"10px"} color='white'>
              <Box className="profile-user">
                <i id="navbar-logo" class="fa-sharp fa-solid fa-user"></i>
              </Box>
            </Tooltip>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='bottom'
              closeOnBlur={true}
              isOpen={isOpenLoginBox}
      onClose={() => setIsOpenLoginBox(false)}
              w="100%"
            >
              <PopoverTrigger >
                <i onClick={()=>setIsOpenLoginBox(true)} class="fa-solid fa-caret-down"></i>
              </PopoverTrigger>
             {userName==""?<PopoverContent border={"none"} color='black' bg='white' w="100%" >
                <PopoverHeader pt={4} border='0' _hover={{ bg: "#d3d3d3" }} >
                  <PopoverArrow bg='white' />
                </PopoverHeader>
                <PopoverArrow bg='blue.800' />
                <PopoverCloseButton />
                <PopoverBody w="100%" m="auto" justifyContent={"center"} textAlign={"center"} border={"none"} p="0px">
                  <Box _hover={{ bg: "#d3d3d3" }} alignItems="center" justifyContent={"center"} pt="10px" display={"flex"} m="auto" >
                    <Box alignItems="center" justifyContent={"center"} gap={"15px"}  display={"flex"}>
                      <Box p="0 20px" alignItems="center" justifyContent={"center"}  >
                     
                        <Button color={"white"} bg="black" _hover={{boxShadow:"2px 2px  4px #fa4a56"}}
                         align={"center"} onClick={handleOpenLogin}>Login</Button>
                     <Text fontSize={"x-small"} color={"gray"}>Please login for accessing your profile.</Text>
                    </Box>
                    </Box>
                   
                  </Box>
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >

                </PopoverFooter>
              </PopoverContent>
              :
             <PopoverContent border={"none"} color='black' bg='white' w="100%" >
                <PopoverHeader pt={4} border='0' _hover={{ bg: "#d3d3d3" }} >
                  <PopoverArrow bg='white' />
                  <Box mt="15px" gap={"10px"} display={"flex"} justifyContent={"center"}
                   alignItems={"center"}>
                    <Box>
                      <Box className="profile-user">
                        <i id="navbar-logo" class="fa-sharp fa-solid fa-user"></i>
                      </Box>
                    </Box>
                    <Box>
                    
                      <Text>{userName}</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Link to="/dashboard"> Go to <span style={{textDecoration:"underline"}}>DASHBOARD</span></Link>
                  </Box>
                </PopoverHeader>
                <PopoverArrow bg='blue.800' />
                <PopoverCloseButton />
                <PopoverBody w="100%" m="auto" justifyContent={"center"} textAlign={"center"}
                 border={"none"} p="0px">
                  <Box _hover={{ bg: "#d3d3d3" }} alignItems="center" justifyContent={"center"} 
                  pt="10px" display={"flex"} m="auto" >
                    <Box alignItems="center" justifyContent={"center"} gap={"15px"}  display={"flex"}>
                      <Link to="">
                        <GoCodeReview fontSize={"30px"} />
                      </Link>
                      <Box alignItems="center" justifyContent={"center"}  display={"flex"}>
                      <Link to="">
                        <Text align={"center"} onClick={logOut}>Log Out</Text>
                      </Link>
                    </Box>
                    </Box>
                   
                  </Box>
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >

                </PopoverFooter>
              </PopoverContent>} 
            </Popover>



          </Box>

          <Box onClick={basketHandel} className="basket">
            <Tooltip hasArrow label='Basket' bg='#333f48' p="10px" borderRadius={"10px"} color='white'>
              <i id="navbar-logo" class="fa-sharp fa-solid fa-basket-shopping"></i>
            </Tooltip>

          </Box>

        </Box> 
        {/* another search bar */}
        <Box display={["flex","flex","none"]}
        justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
       
         {/* hamburger */}
      

{/* ////////// */}

   <Button bg="white" _hover={{backgroundColor:"white"}} onClick={onOpen}>
   <MdOutlineSubject size={"40px"} />  
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent >
       
          <DrawerHeader color="#fa4a6f" fontFamily={"cursive"} fontSize={"2xl"} >
          MeghKhush Creation
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody fontFamily={"revert-layer"}>
            <Stack spacing='24px'>
              <Box>
              <Center fontWeight={500} fontSize={"2xl"}>  Browse Categories</Center>
<Box  mt="25px" >
  <Box cursor={"pointer"} onClick={()=>navigate(`/search/bouquet`)} mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Combos & Hamper</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate(`/search/birthday`)}  mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Birthday</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate("/search/decor")}  mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Home Decor</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate("/search/Personalized")}  mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Personalised</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate("/search/wedding")}  mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Wedding & Party</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate("/search/frame")}  mt="15px" mb="15px"  alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Frames</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"} onClick={()=>navigate("/nameplate")}  mt="15px" mb="15px"  alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>NamePlates</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>
 
  <Box cursor={"pointer"} onClick={()=>navigate("/gift")}   mt="15px" mb="15px" alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
    <Text fontWeight={500} fontSize={"md"}>Gifts</Text>
    <IoIosArrowForward size={"20px"} fontWeight={1000} />
  </Box>

  <Box cursor={"pointer"}  mt="15px" mb="15px"  alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
  <a  style={{fontSize:"20px",color:"#fa4a6f"}}  onClick={()=>{onClose();handleOpen()}} className="name-tag">{userName==""?`Sign Up/Login`:userName}</a>
  </Box>
</Box>               

            
      
           
              </Box>
            </Stack>
          </DrawerBody>

         
        </DrawerContent>
      </Drawer>
{/* ///////// */}


        {/* search bar */}
        <Box borderRadius={"50px"} border={"2px solid black"} 
        display={"flex"} alignItems={"center"}  justifyContent={"space-between"}
      w="100%"   p="0px 20px 0px 10px" mt="5px"
        bg="#f4f4f4">
            <Box >
              <Input onKeyPress={(e)=>{if(e.key=="Enter") search()}} 
             value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}
               border={"none"} _focus={{ boxShadow: 'none', }} _hover={{ border: 'none' }} 
               placeholder="Search for anything" />
            </Box>

            <Box className="search-logo" >
              <i onClick={search} class="fa-solid fa-magnifying-glass"></i>
            </Box>
          </Box>
        

        </Box>

        <Box display={["none","none","block"]} className="navbar-2">


          <ul className="nav-link">
            {/* 1st Box */}
            <li  className="main-box">
              <a onClick={()=>navigate("/search/bouquet")} className="name-tag">Combos & Hamper</a>
              <Box className="hidden-box"></Box>

            </li>
            {/* 2nd Box */}

            <li className="main-box">
              <a onClick={()=>navigate("/search/birthday")}  className="name-tag">Birthday</a>
              <Box  className="hidden-box">
             
              </Box>
            </li>
            {/* 3rd Box */}
            <li className="main-box">
              <a onClick={()=>navigate("/search/home")}  className="name-tag">Home Decor</a>
              <Box className="hidden-box"></Box>

            </li>
            {/* 4th Box */}
            <li className="main-box">
              <a  onClick={()=>navigate("/search/Personalized")} className="name-tag">Personalised</a>
              <Box className="hidden-box"></Box>

            </li>
            {/* 5th Box */}
            <li className="main-box">
              <a  onClick={()=>navigate("/search/wedding")} className="name-tag">Wedding & Party</a>
              <Box className="hidden-box"></Box>

            </li>
            {/* 6th Box */}
            <li className="main-box">
              <a  onClick={()=>navigate("/search/frame")} className="name-tag">Frames</a>
              <Box className="hidden-box"></Box>

            </li>
              {/* 7th Box */}
              {
                !userName &&
                   <li 
           
            className="main-box">
              <a   onClick={handleOpen} className="name-tag">{userName==""?`Sign Up/Login`:userName}</a>

      <Modal isOpen={isOpenBox} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl id="email" isRequired>
              <Button colorScheme="blue" mb="10px" onClick={handleLoginFromSIgnUp}>LOGIN</Button>
                <FormLabel>Email:</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password:</FormLabel>
                <Input type="password" value={password}  onFocus={()=>passwordValidation()} onChange={(e) => setAllPasswordValidation(e.target.value)} />
             {showPd&&
             <Box fontSize={"smaller"} m="10px 0">
            {
              passwordValidationMessages.map((ele,idx)=>{
                return(
                  <Text color={pdvalid[idx]?"blue":"red"} display={"flex"} alignItems={"center"} gap={"5px"}>
                  <Box display={pdvalid[idx]?"block":"none"}>
                  <MdOutlineCheckCircle />
                  </Box>
                  {ele}
                  </Text>
                )
              })
            }
             </Box>
             }
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number:</FormLabel>
                <Input type="tel" value={phone}  onChange={handlePhoneChange} />
              </FormControl>
              <FormControl id="name" isRequired>
                <FormLabel>Name:</FormLabel>
                <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>Sign Up</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenLogin} onClose={handleCloseLogin}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e)=>handleSubmitLogin(e,loginEmail,loginPassword)}>
            <ModalBody>
              <FormControl id="loginEmail" isRequired>
                <FormLabel>Email:</FormLabel>
                <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </FormControl>
              <FormControl id="loginPassword" isRequired>
                <FormLabel>Password:</FormLabel>
                <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </FormControl>
            
              <Box mt="15px" display={"grid"} m="auto" justifyContent={"center"}>
              <Button mt="10px" type="submit" colorScheme="blue">Login</Button>
         

              </Box>
           
           
            
            </ModalBody>
            <ModalFooter>   
           
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
            </li> 
              }
        
            {/* 8th Box */}
            <li className="main-box">
              <a   onClick={()=>navigate("/nameplate")} className="name-tag">NamePlates</a>
              <Box className="hidden-box"></Box>

            </li>
            {/* 9th Box */}
            <li className="main-box">
              <Link to="/gift" className="name-tag">Gifts</Link>
              <Box className="hidden-box"></Box>

            </li>

          </ul>
        </Box>



      </Box>
      </Box>
      <hr style={{ marginTop: "10px" }} />
    </>
  )
}