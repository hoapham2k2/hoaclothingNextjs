import { updateNotification } from "@mantine/notifications";
import axios from "axios";
import { Product } from "./types";

const uploadProduct = async (formData: Product) => {
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
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
      console.log("post form data to server successfully");
      console.log("res is: ", res);

      updateNotification({
        id: "uploading-product",
        color: "green",
        title: "Upload product successfully",
        message: "Upload product successfully",
        autoClose: 2000,
      });
    })
    .catch((error) => {
      console.log("post form data to server fail");
      console.log("error is: ", error);
      updateNotification({
        id: "uploading-product",
        loading: false,
        color: "red",
        title: "Upload product fail",
        message: "Upload product fail",
        autoClose: 2000,
      });
    });
};

export default uploadProduct;
