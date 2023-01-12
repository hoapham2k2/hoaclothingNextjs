import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/dbConnect";
import ProductModel from "../../../models/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connect()
    .then(() => console.log("connected to db"))
    .catch((err) => console.error(err));

  switch (method) {
    case "GET":
      await ProductModel.find({})
        .then((products) => {
          res.status(200).json(products);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      break;

    case "POST":
      await ProductModel.create(req.body)
        .then((product) => {
          res.status(201).json({
            success: true,
            message: product,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: err,
          });
        });
      break;
    default:
      res.status(400).json({
        error: "Method not supported",
      });
      break;
  }
};

export default handler;
