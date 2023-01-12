import { Box, Button, Drawer, Grid, Select, TextInput } from "@mantine/core";
import React from "react";
import FormAddProduct from "./FormAddProduct";

type Props = {};

const ProductTableOption = (props: Props) => {
  const [AddProductOpen, setAddProductOpen] = React.useState<boolean>(false);
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        // "&:hover": {
        //   backgroundColor:
        //     theme.colorScheme === "dark"
        //       ? theme.colors.dark[5]
        //       : theme.colors.gray[1],
        // },
      })}
    >
      <Grid gutter={50} grow>
        <Grid.Col span={3}>
          <TextInput placeholder="Search by product name" />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            placeholder="Select category"
            data={[
              { label: "Category 1", value: "category-1" },
              { label: "Category 2", value: "category-2" },
              { label: "Category 3", value: "category-3" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            placeholder="Price"
            data={[
              { label: "Low to High", value: "price-1" },
              { label: "High to Low", value: "price-2" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setAddProductOpen(true)}
          >
            Add Product
          </Button>
        </Grid.Col>
      </Grid>
      <FormAddProduct open={AddProductOpen} setOpen={setAddProductOpen} />
    </Box>
  );
};

export default ProductTableOption;
