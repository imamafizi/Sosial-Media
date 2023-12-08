import {
  Box,
  Button,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import {
  RiHomeHeartLine,
  RiNotificationLine,
  RiAccountCircleLine,
} from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("sosialmedia");
    navigate("/login");
  };
  return (
    <Box
      //   bg={"#f2f2f2"}
      w={"250px"}
      h={"100vh"}
      boxShadow={"lg"}
      position={"fixed"}
    >
      <List spacing={4} ml={"30px"} mt={"10px"}>
        <ListItem>
          <Button
            leftIcon={<RiHomeHeartLine />}
            size={"lg"}
            variant="ghost"
            borderRadius={"50px"}
            color={"#ff6d21"}
            _hover={{
              bg: "#1f203a",
            }}
          >
            Home
          </Button>
        </ListItem>
        <ListItem>
          <Button
            leftIcon={<RiNotificationLine />}
            size={"lg"}
            borderRadius={"50px"}
            variant="ghost"
            color={"#ff6d21"}
            _hover={{
              bg: "#1f203a",
            }}
          >
            Notification
          </Button>
        </ListItem>
        <ListItem>
          <Button
            leftIcon={<MdOutlineEmail />}
            size={"lg"}
            variant="ghost"
            borderRadius={"50px"}
            color={"#ff6d21"}
            _hover={{
              bg: "#1f203a",
            }}
          >
            Message
          </Button>
        </ListItem>
        <ListItem>
          <Button
            leftIcon={<RiAccountCircleLine />}
            size={"lg"}
            variant="ghost"
            borderRadius={"50px"}
            color={"#ff6d21"}
            _hover={{
              bg: "#1f203a",
            }}
          >
            Profile
          </Button>
        </ListItem>

        <ListItem>
          {user.id ? (
            <Menu>
              <MenuButton
                as={Button}
                mt={"390px"}
                leftIcon={<RiAccountCircleLine />}
                size={"lg"}
                variant="ghost"
                borderRadius={"50px"}
                color={"#ff6d21"}
                _hover={{
                  bg: "#1f203a",
                }}
              >
                {user.username}
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          ) : null}
        </ListItem>
      </List>
    </Box>
  );
};
