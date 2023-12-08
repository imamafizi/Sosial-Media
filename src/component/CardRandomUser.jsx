/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const CardRandomUser = ({ randomUsers }) => {
  return (
    <Box boxShadow={"lg"} p="4" borderRadius="16px" mt="2">
      <Text fontWeight="bold" color="#ff6d21">
        Who to follow
      </Text>

      {randomUsers.map((user) => {
        return (
          <Flex
            key={user.id}
            alignItems="center"
            justifyContent="space-between"
            shadow="sm"
          >
            <Flex alignItems="center" gap="2" py="2">
              <Link>
                <Avatar size="sm" bg="#ff6d21" />
              </Link>
              <Link>
                <Text fontSize="small" fontWeight="bold">
                  {user.username}
                </Text>
              </Link>
            </Flex>
            <HiOutlineUserAdd fontSize="20px" color="#ff6d21" />
          </Flex>
        );
      })}
    </Box>
  );
};

export default CardRandomUser;
