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
import React from "react";
import ProductDropzone from "./ProductDropzone";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAddProduct = (props: Props) => {
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
                  <TextInput placeholder="input the product name" />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Description</p>
                <div className="col-span-8">
                  <Textarea placeholder="input the product name" minRows={4} />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Price (USD)</p>
                <div className="col-span-8">
                  <NumberInput
                    placeholder="input the product price"
                    defaultValue={0}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Image 1</p>
                <div className="col-span-8">
                  <ProductDropzone />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Product Image 2</p>
                <div className="col-span-8">
                  <ProductDropzone />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <p className="col-span-4">Categories</p>
                <div className="col-span-8">
                  <MultiSelect
                    placeholder="Select category"
                    data={["a", "b", "c"]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full hover:bg-transparent hover:border-white rounded-md ">
              Cancel
            </Button>
            <Button className="w-full bg-green-700 hover:bg-green-900">
              Add Products
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FormAddProduct;
