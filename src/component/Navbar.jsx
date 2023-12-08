import { Box, Container, Image, Menu, MenuButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box
      bgGradient="linear(to-r, #68697a, #1f203a)"
      w={"full"}
      position={"fixed"}
      zIndex="999"
      backdropFilter="blur(8px)"
    >
      <Container
        maxW={"6xl"}
        display={"flex"}
        justifyContent={"space-between"}
        py={4}
      >
        <Box>
          <Link to="/">
            <Image src="logo.png" alt="Dan Abramov" w={"100px"} />
          </Link>
        </Box>
        <Box>
          {user.id ? (
            <Menu isLazy>
              <MenuButton
                color={"#ff6d21"}
                fontWeight={"bold"}
                fontSize={"24px"}
              >
                Hey, {user.username}
              </MenuButton>
            </Menu>
          ) : (
            <Box>
              <NavLink
                to="/login"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    fontSize: "24px",
                    paddingLeft: "10px",
                    color: isActive ? "#ff6d21" : "white",
                  };
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    fontSize: "24px",
                    paddingLeft: "20px",
                    color: isActive ? "#ff6d21" : "white",
                  };
                }}
              >
                Register
              </NavLink>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
