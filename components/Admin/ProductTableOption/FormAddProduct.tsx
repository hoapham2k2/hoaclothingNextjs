import {
  Button,
  Drawer,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useEffect } from "react";
import ProductDropzone from "./ProductDropzone";
import { Product } from "../../../utils/types";
import axios from "axios";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAddProduct = (props: Props) => {
  const [product, setProduct] = React.useState<Product>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productImg1: "",
    productImg2: "",
    categories: [],
  });

  const [img1, setImg1] = React.useState<File | null>(null);
  const [img2, setImg2] = React.useState<File | null>(null);

  useEffect(() => {
    if (img1) console.log("img1 file", img1);
  }, [img1]);

  useEffect(() => {
    if (img2) console.log("img2 file", img2);
  }, [img2]);

  useEffect(() => {
    if (product.categories) console.log("categories", product.categories);
  }, [product.categories]);

  const handleOnClick = async () => {
    if (!img1 || !img2) {
      alert("Please upload 2 images");
      return;
    }

    await uploadFileToCloudinary(
      img1,
      (url: string) => (product.productImg1 = url)
    );
    await uploadFileToCloudinary(
      img2,
      (url: string) => (product.productImg2 = url)
    );

    await console.log("product is: ", product);

    await uploadProduct(product)
      .then(() => {
        console.log("upload product successfully");
      })
      .catch((err) => {
        console.log("upload product failed");
      });
  };

  const uploadProduct = async (formData: Product) => {
    try {
      await axios
        .post(
          "/api/products",
          {
            productName: formData.productName,
            productDescription: formData.productDescription,
            productPrice: formData.productPrice,
            productImg1: formData.productImg1,
            productImg2: formData.productImg2,
            categories: formData.categories,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("res is: ", res);
        });
      console.log("post form data to server successfully");
    } catch (error) {
      console.log("post form data to server failed", error);
    }
  };

  const uploadFileToCloudinary = async (
    file: File,
    callback: (url: string) => void
  ) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "clothing");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxjnvnxco/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const fileData = await res.json();
    console.log("fileData url is: ", fileData);
    callback(fileData.secure_url);
  };

  return (
    <div>
      <Drawer
        opened={props.open}
        onClose={() =>
          props.setOpen((prev) => {
            return !prev;
          })
        }
        title="Add Product"
        padding="xl"
        size="xl"
        position="right"
        sx={(theme) => ({
          ".mantine-Drawer-body": {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            height: "95%",
          },
        })}
      >
        <div className="flex flex-col  justify-between h-full">
          <div className="flex-1 overflow-auto p-4 ">
            <div className="min-h-[1234px] flex flex-col gap-4">
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Name</p>
                <div className="col-span-8">
                  <TextInput
                    placeholder="input the product name"
                    value={product.productName}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        productName: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Description</p>
                <div className="col-span-8">
                  <Textarea
                    placeholder="input the product description"
                    minRows={4}
                    value={product.productDescription}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        productDescription: e.currentTarget.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Price (USD)</p>
                <div className="col-span-8">
                  <NumberInput
                    placeholder="input the product price"
                    defaultValue={0}
                    value={product.productPrice}
                    onChange={(value) => {
                      setProduct({
                        ...product,
                        productPrice: value as number,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Image 1</p>
                <div className="col-span-8">
                  <ProductDropzone img={img1} setImg={setImg1} />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Image 2</p>
                <div className="col-span-8">
                  <ProductDropzone img={img2} setImg={setImg2} />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Categories</p>
                <div className="col-span-8">
                  <MultiSelect
                    placeholder="Select category"
                    data={["a", "b", "c"]}
                    value={product.categories}
                    onChange={(value) => {
                      setProduct({
                        ...product,
                        categories: value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full hover:bg-transparent hover:border-white rounded-md ">
              Cancel
            </Button>
            <Button
              className="w-full bg-green-700 hover:bg-green-900"
              onClick={handleOnClick}
            >
              Add Products
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FormAddProduct;
