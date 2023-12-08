/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {
  HiOutlineEmojiHappy,
  HiOutlineMicrophone,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";

const TextArea = ({ getTweets }) => {
  const userId = useSelector((state) => state.user.id);
  const [tweet, setTweet] = useState("");

  const handleTweet = async () => {
    if (!userId) return alert("Please login your account");
    if (tweet === "") return alert("Cannot empty");

    await axios.post(`${baseUrl}/tweets`, {
      tweet,
      userId,
      date: new Date(),
    });
    alert("success");
    setTweet("");
    getTweets();
  };

  return (
    <Box shadow="sm" pb="8" mb="4">
      <Flex
        gap={{ base: "4", md: "8" }}
        px={{ base: "4", md: "8" }}
        mt={{ base: "4", md: "2" }}
        alignItems="center"
      >
        <Avatar bg="#ff6d21" size={{ base: "md", md: "xl" }} />
        <Textarea
          name="textarea"
          size="sm"
          resize="none"
          onChange={(e) => setTweet(e.target.value)}
          value={tweet}
          placeholder="What is happening?!"
          maxLength={150}
        />
      </Flex>
      <Box mx={{ base: "4", md: "8" }} textAlign="end">
        <Text my="2">{tweet.length}/150</Text>
        <Flex justifyContent="space-between">
          <Flex gap="4" alignItems="center">
            <HiOutlinePhotograph color="#ff6d21" fontSize="30px" />
            <HiOutlineMicrophone color="#ff6d21" fontSize="30px" />
            <HiOutlineEmojiHappy color="#ff6d21" fontSize="30px" />
          </Flex>
          <Button
            variant="solid"
            borderRadius={"50px"}
            onClick={handleTweet}
            color={"#ff6d21"}
            _hover={{
              bg: "#1f203a",
            }}
          >
            Share
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default TextArea;
