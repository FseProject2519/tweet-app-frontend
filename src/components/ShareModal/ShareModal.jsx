import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({ modalOpened, setModalOpened, oldData, location }) => {
  const theme = useMantineTheme();
  console.log(oldData)

  return (
    <Modal data-test="ShareModal-Test"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='60%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <h3>Edit Post</h3>
      <PostShare oldData={oldData} location={location} isModal={true} />
    </Modal>
  );
};

export default ShareModal;
