import React from "react";
import ProductTableOption from "../../../components/Admin/ProductTableOption";

type Props = {};

const Products = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Products</p>
      <ProductTableOption />
    </div>
  );
};

export default Products;
