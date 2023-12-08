/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistance } from "date-fns";
import {
  HiOutlineChatAlt2,
  HiOutlineDotsVertical,
  HiOutlineShare,
  HiHeart,
} from "react-icons/hi";
import { baseUrl } from "../utils/config";
import { useState } from "react";
import { useSelector } from "react-redux";

const CardTweet = ({ tweet, getTweets }) => {
  const user = useSelector((state) => state.user);
  const date = formatDistance(new Date(tweet.date), new Date(), {
    addSuffix: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweett, setTweet] = useState(tweet.tweet);

  const handleEdit = async () => {
    await axios.patch(`${baseUrl}/tweets/${tweet.id}`, { tweet: tweett });
    onClose();
    getTweets();
  };

  const handleDelete = async () => {
    await axios.delete(`${baseUrl}/tweets/${tweet.id}`);
    onClose();
    getTweets();
  };

  return (
    <Box minH="140px" mb="2" ml={"40px"}>
      <Flex alignItems="center" mb="2" justifyContent="space-between">
        <Flex gap="3" alignItems="center">
          <Avatar size={{ base: "sm", md: "md" }} />

          <Text fontWeight="bold" fontSize="18px">
            @{tweet.user.username}
          </Text>
          <Text>{date}</Text>
        </Flex>
      </Flex>
      {user.id === tweet.user.id ? (
        <Menu>
          <MenuButton>
            <HiOutlineDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </Menu>
      ) : null}
      <Text>{tweet.tweet}</Text>
      <Flex justifyContent="center" alignItems="center" gap="20" mt="4">
        <Flex alignItems="center">
          <Button variant="ghost">
            <HiHeart fontSize="24px" />
          </Button>
          <Text></Text>
        </Flex>
        <HiOutlineChatAlt2 fontSize="24px" />
        <HiOutlineShare fontSize="24px" />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent mt={"150px"}>
          <ModalBody>
            <Textarea
              placeholder="Edit here..."
              size="sm"
              resize="none"
              value={tweett}
              maxLength={150}
              onChange={(e) => {
                setTweet(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              borderRadius={"50px"}
              color={"white"}
              colorScheme="red"
            >
              Close
            </Button>
            <Button
              mr={3}
              onClick={handleEdit}
              variant="solid"
              borderRadius={"50px"}
              color={"#ff6d21"}
              _hover={{
                bg: "#1f203a",
              }}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardTweet;
