import {
  Button,
  Drawer,
  MultiSelect,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useEffect } from "react";
import ProductDropzone from "./ProductDropzone";
import { Product } from "../../../utils/types";
import { showNotification } from "@mantine/notifications";
import uploadFileToCloudinary from "../../../utils/uploadFileToCloudinary";
import uploadProduct from "../../../utils/uploadProduct";

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

  // this function will send the product to the backend
  const handleOnClick = async () => {
    // return first if there is no image
    if (!img1 || !img2) {
      await showNotification({
        color: "red",
        title: "Please upload 2 images",
        message: "Please upload 2 images",
      });
      return;
    }
    await setProductToDefault();
    await showNotification({
      id: "uploading-product",
      loading: true,
      title: "Uploading product",
      message: "We are uploading your product",
      autoClose: false,
    });
    await uploadFileToCloudinary(
      img1,
      (url: string) => (product.productImg1 = url)
    );
    await uploadFileToCloudinary(
      img2,
      (url: string) => (product.productImg2 = url)
    );
    await uploadProduct(product);
  };

  // this function will set the product to default
  const setProductToDefault = async () => {
    await setProduct({
      productName: "",
      productDescription: "",
      productPrice: 0,
      productImg1: "",
      productImg2: "",
      categories: [],
    });
    await setImg1(null);
    await setImg2(null);
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
