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
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { baseUrl } from "../utils/config";
YupPassword(yup);

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("You must enter a username")
    .min(4, "Minimun 4 characters"),
  email: yup
    .string()
    .required("Your email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Your password is required")
    .min(6, "Password minimun 6 characters")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  checkpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Password do not match"),
});

export const CardRegister = () => {
  const [show, setShow] = useState(false);
  const [check, setcheck] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { username, email, password } = values;
        const { data: isEmailExist } = await axios.get(
          `${baseUrl}/users?email=${email}`
        );

        console.log("isEmailExist", isEmailExist);
        if (isEmailExist.length) {
          return alert("email already exist");
        }
        const { data: isUsernameExist } = await axios.get(
          `${baseUrl}/users?username=${username}`
        );
        if (isUsernameExist.length) {
          return alert("username already exist");
        }

        await axios.post(`${baseUrl}/users`, {
          username,
          email,
          password,
        });

        toast({
          title: "Register Success",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });

        navigate("/login");
      } catch (error) {
        console.log(error);
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
            Page Register
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
              isInvalid={Boolean(
                formik.errors.username && formik.touched.username
              )}
            >
              <FormLabel>User Name</FormLabel>
              <Input
                name="username"
                type="text"
                placeholder="Your Name"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={Boolean(formik.errors.email && formik.touched.email)}
            >
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="text"
                variant="filled"
                placeholder="Your Mail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={Boolean(
                formik.errors.password && formik.touched.password
              )}
            >
              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="password"
                  pr="4.5rem"
                  variant="filled"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={Boolean(
                formik.errors.checkpassword && formik.touched.checkpassword
              )}
            >
              <FormLabel>Check Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="checkpassword"
                  pr="4.5rem"
                  variant="filled"
                  type={check ? "text" : "password"}
                  placeholder="Enter password"
                  onBlur={formik.handleBlur}
                  value={formik.values.checkpassword}
                  onChange={formik.handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setcheck(!check)}
                  >
                    {check ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.checkpassword}</FormErrorMessage>
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
              Sign Up
            </Button>
          </form>
          <Text>
            Already have an account?
            <Link
              to={"/login"}
              style={{ color: "#ff6d21", textUnderlineOffset: "true  " }}
            >
              {" "}
              <b>Login here!!</b>
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};
