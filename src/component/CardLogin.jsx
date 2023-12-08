import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginAction } from "../redux/slices/usersSlice";
import { baseUrl } from "../utils/config";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email cannot be empty"),
  password: Yup.string()
    .required("You must enter a password")
    .min(6, "Password must be at least 8 characters"),
});

export const CardLogin = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { usernameOrEmail, password } = values;
      const isEmail = usernameOrEmail.includes("@");

      try {
        let userData;

        if (isEmail) {
          userData = await axios.get(
            `${baseUrl}/users?email=${usernameOrEmail}&password=${password}`
          );
        } else {
          userData = await axios.get(
            `${baseUrl}/users?username=${usernameOrEmail}&password=${password}`
          );
        }

        if (!userData.data.length) {
          return alert("Wrong Username or Password, try again!!");
        }

        localStorage.setItem("sosialmedia", JSON.stringify(userData.data[0]));

        navigate("/");
        dispatch(loginAction(userData.data[0]));

        toast({
          title: "Login Success",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: error.message,
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"#ff6d21"}>
            Page Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={
                !!formik.errors.usernameOrEmail &&
                formik.touched.usernameOrEmail
              }
            >
              <FormLabel>Name/Email</FormLabel>
              <Input
                name="usernameOrEmail"
                type="text"
                placeholder="UserName/Email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.usernameOrEmail}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>
                {formik.errors.usernameOrEmail}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="password"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              mt={"20px"}
              type="submit"
              variant="solid"
              borderRadius={"50px"}
              color={"#ff6d21"}
              _hover={{
                bg: "#1f203a",
              }}
            >
              Sign In
            </Button>
          </form>
          <Text>
            Dont have an account?
            <Link
              to={"/register"}
              style={{ color: "#ff6d21", textUnderlineOffset: "true  " }}
            >
              {" "}
              <b>Register!!</b>
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};
