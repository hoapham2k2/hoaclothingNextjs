import { useState, useEffect } from "react";
import { Text, Image, SimpleGrid, CloseButton } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

type Props = {
  img: File | null;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ProductDropzone(props: Props) {
  const [files, setFiles] = useState<File | null>(null);


  const previewFile = (file: File)  => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <>
     {
       props.img && (
        <div className="img-prev relative w-fit h-fit">
        <Image
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt={file.name}
          height={100}
          width={100}
          ></Image>
        <CloseButton
          className="absolute top-[-10px] right-[-10px]  rounded-full "
          size="xl"
          iconSize={20}
          onClick={() => props.setImg(null)}
          ></CloseButton>
      </div>
      )
    }
    </>
    );
  };

  return (
    <div className="flex justify-between w-full gap-4">
      <Dropzone
        sx={{
          margin: "0",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "fit-content",
        }}
        accept={IMAGE_MIME_TYPE}
        // onDrop={(files) => setFiles(files[0])}
        onDrop={(files) => props.setImg(files[0])}
        multiple={false}
      >
        <Text align="center" size={14}>
          Drop images here
        </Text>
      </Dropzone>

      <div className="flex-1">{props.img && 
        previewFile(props.img)
      }</div>
    </div>
  );
}
