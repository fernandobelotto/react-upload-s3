import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Button, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

const REGION = "";
const BUCKET = "";
const ACCESS_KEY_ID = "";
const SECRET_ACCESS_KEY = "";

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const FileUploadS3 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<any>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target && event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("No file selected");
      return;
    }

    const params = {
      Bucket: BUCKET,
      Key: file.name,
      Body: file,
      UploadId: "uploadId",
      PartNumber: 1,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await client.send(command);
      console.log(data);
    } catch (error) {
      console.warn(error);
    } finally {
      console.log("finished");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLabel htmlFor="file">Select a file:</FormLabel>
      <Input type="file" id="file" onChange={handleChange} />
      <Button type="submit">Upload</Button>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </form>
  );
};
