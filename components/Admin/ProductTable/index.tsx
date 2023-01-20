import { useEffect } from "react";
import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { GetStaticProps } from "next";
import React from "react";
import { Product } from "../../../utils/types";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/productsSlice";

type Props = {};

const ProductTable = (props: Props) => {
  const products = useSelector(
    (state: { products: { products: Product[] } }) => state.products.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, []);

  return (
    <Paper p="xl">
      <DataTable
        withBorder
        striped
        highlightOnHover
        records={products}
        columns={[
          { accessor: "_id", title: "ID" },
          { accessor: "productName", title: "Name" },
          {
            accessor: "productDescription",
            title: "Description",
            render: (value: Product) => <div>{value.productDescription}</div>,
          },
          { accessor: "productPrice", title: "Price" },
          {
            accessor: "productImg1",
            title: "Img1",
            render: (value: Product) => (
              <img src={value.productImg1} alt="productImg1" width="100" />
            ),
          },
          // {
          //   accessor: "productImg2",
          //   title: "Img2",
          //   render: (value: Product) => (
          //     <img src={value.productImg2} alt="productImg2" width="100" />
          //   ),
          // },
          { accessor: "categories", title: "Category" },
          {
            accessor: "actions",
            title: <Text mr="xs">Row actions</Text>,
            textAlignment: "right",
            render: (company) => (
              <Group spacing={4} position="right" noWrap>
                <ActionIcon
                  color="blue"
                  // onClick={(e: MouseEvent) => {
                  //   e.stopPropagation();
                  //   editInfo(company);
                  // }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  // onClick={(e: MouseEvent) => {
                  //   e.stopPropagation();
                  //   deleteCompany(company);
                  // }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        idAccessor="_id"
      />
    </Paper>
  );
};

export default ProductTable;
