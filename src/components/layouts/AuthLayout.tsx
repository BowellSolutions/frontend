import {FC, ReactNode, useEffect, useRef} from "react";
import Footer from "../footer/Footer";
import {Box, Portal, useColorModeValue} from "@chakra-ui/react";
import AuthNavbar from "../navbar/AuthNavbar";
import Head from "next/head";
import {useDispatch} from "react-redux";
import {checkAuthStatus} from "../../redux/actions/auth";

interface AuthLayoutProps {
  children: ReactNode,
  title: string,
  description?: string,
  secondary: boolean,
}

const AuthLayout: FC<AuthLayoutProps> = (
  {children, title, description, secondary}
) => {
  const bgColor = useColorModeValue("teal.400", "");

  const dispatch = useDispatch();

  const wrapper = useRef(null);
  const navRef = useRef(null);


  useEffect(() => {
    // check if we are still authenticated
    if (dispatch != null) dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content={description}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Box ref={navRef} w="100%" minH="100vh" bg={bgColor}>
        <Portal
          containerRef={navRef}
        >
          <AuthNavbar
            secondary={secondary}
            logoText="BOWELL"
          />
        </Portal>

        <Box w="100%">
          <Box
            ref={wrapper}
            w="100%"
          >
            {children}
          </Box>
        </Box>

        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer textColor="white" linkColor="teal.200"/>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
