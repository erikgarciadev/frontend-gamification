import React from "react";
import LayoutStudent from "../../../components/student/layout";
import { Box, Spinner, Text } from "@chakra-ui/react";
import axiosInstance from "../../../config/axiosInstance";
import { useAppSelector } from "../../../app/hooks";
import Badge from "../../../components/utils/badge";
import CardGift from "../../../components/utils/card";

const BadgesStudent = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [badges, setBadges] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getUserBadges = async () => {
    setLoading(true);
    const res = await axiosInstance.get(`/user_badges/user/${user?._id}`);

    console.log(res.data);
    setBadges(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    getUserBadges();
  }, []);

  return (
    <LayoutStudent>
      {loading ? (
        <Box
          h="full"
          w="full"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box p={5}>
          {badges?.length === 0 ? (
            <Text fontWeight={"bold"} fontSize="2xl">
              Por el momento no cuenta con Logros
            </Text>
          ) : (
            <Box
              display={"grid"}
              gap={5}
              gridGap={5}
              gridTemplateColumns={{
                base: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
                lg: "repeat(4,1fr)",
              }}
            >
              {badges.map((badge: any) => (
                <Box
                  key={badge._id}
                  display={"flex"}
                  position={"relative"}
                  justifyContent={"center"}
                  py={6}
                >
                  <Badge image_url={badge.badge.image_url} />
                </Box>
              ))}
              {/* <Box
                display={"flex"}
                position={"relative"}
                justifyContent={"center"}
                py={6}
              >
                <CardGift
                  image_url={
                    "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                  }
                />
              </Box>
              <Box
                display={"flex"}
                position={"relative"}
                justifyContent={"center"}
                py={6}
              >
                <Badge
                  image_url={
                    "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                  }
                />
              </Box>
              <Box
                display={"flex"}
                position={"relative"}
                justifyContent={"center"}
                py={6}
              >
                <Badge
                  image_url={
                    "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                  }
                />
              </Box>
              <Box
                display={"flex"}
                position={"relative"}
                justifyContent={"center"}
                py={6}
              >
                <Badge
                  image_url={
                    "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                  }
                />
              </Box> */}
            </Box>
          )}
          {/* <Box
            display={"grid"}
            gap={5}
            gridGap={5}
            gridTemplateColumns={{
              base: "repeat(1,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(4,1fr)",
            }}
          >
            <Box
              display={"flex"}
              position={"relative"}
              justifyContent={"center"}
              py={6}
            >
              <CardGift
                image_url={
                  "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                }
              />
            </Box>
            <Box
              display={"flex"}
              position={"relative"}
              justifyContent={"center"}
              py={6}
            >
              <Badge
                image_url={
                  "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                }
              />
            </Box>
            <Box
              display={"flex"}
              position={"relative"}
              justifyContent={"center"}
              py={6}
            >
              <Badge
                image_url={
                  "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                }
              />
            </Box>
            <Box
              display={"flex"}
              position={"relative"}
              justifyContent={"center"}
              py={6}
            >
              <Badge
                image_url={
                  "http://res.cloudinary.com/pruebafisi/image/upload/v1686192739/fjvgqrwwypjlb2ldqhwd.jpg"
                }
              />
            </Box>
          </Box> */}
        </Box>
      )}
    </LayoutStudent>
  );
};

export default BadgesStudent;
