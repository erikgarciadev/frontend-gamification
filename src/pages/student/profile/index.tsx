import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import LayoutStudent from "../../../components/student/layout";
import FormUpdatePassword from "../../../components/student/home/forms/update-password";
import FormUpdateProfile from "../../../components/student/home/forms/update-profile";

const ProfileStudent = () => {
  return (
    <>
      <LayoutStudent>
        <Box
          w="full"
          py={10}
          display={"flex"}
          justifyContent={"center"}
          margin="0 auto"
        >
          <Box shadow={"lg"} p="4" rounded={"lg"}>
            <Tabs>
              <TabList>
                <Tab>INFORMACIÓN</Tab>
                <Tab>CAMBIAR CONTRASEÑA</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormUpdateProfile />
                </TabPanel>
                <TabPanel>
                  <FormUpdatePassword />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </LayoutStudent>
    </>
  );
};

export default ProfileStudent;
