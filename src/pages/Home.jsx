import { Box, Grid, GridItem } from "@chakra-ui/react";
import TextArea from "../component/TextArea";
import { SideBar } from "../component/SideBar";
import CardTweet from "../component/CardTweet";
import { useEffect, useState } from "react";
import axios from "axios";
import CardRandomUser from "../component/CardRandomUser";
import { baseUrl } from "../utils/config";
import { useSelector } from "react-redux";
import _ from "lodash";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const userId = useSelector((state) => state.user.id);

  const getTweets = async () => {
    const { data } = await axios.get(
      `${baseUrl}/tweets?_sort=id&_order=desc&_expand=user`
    );
    setTweets(data);
    setIsLoading(false);
  };

  const getUsers = async () => {
    const { data } = await axios.get(`${baseUrl}users?id_ne=${userId}`);
    const shuffleArray = _.shuffle(data);
    setRandomUsers(shuffleArray);
  };

  useEffect(() => {
    getTweets();
    getUsers();
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Box>
      <Grid w="full" templateColumns="repeat(6, 1fr)" gap={2}>
        <GridItem colSpan={{ base: 5, md: 1 }} mt={"70px"}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={{ base: 5, md: 4 }} shadow="lg" mt={"70px"}>
          <TextArea getTweets={getTweets} />
          {tweets.map((tweet) => {
            return (
              <CardTweet key={tweet.id} tweet={tweet} getTweets={getTweets} />
            );
          })}
        </GridItem>
        <GridItem
          colSpan={1}
          display={{ base: "none", md: "block" }}
          mt={"70px"}
        >
          <CardRandomUser randomUser={randomUsers} />
        </GridItem>
      </Grid>
    </Box>
  );
};
