import React from "react";
import ProductTableOption from "../../../components/Admin/ProductTableOption";
import ProductTable from "../../../components/Admin/ProductTable";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Product } from "../../../utils/types";

type Props = {};

const Products = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Products</p>
      <ProductTableOption />
      <ProductTable />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default Products;
