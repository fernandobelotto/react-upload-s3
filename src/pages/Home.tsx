import { Center } from "@chakra-ui/react";
import { FileUploadS3 } from "../components/FileUploadS3";
export const Home = () => {
  return (
    <Center h="100vh">
      <FileUploadS3 />
    </Center>
  );
};
