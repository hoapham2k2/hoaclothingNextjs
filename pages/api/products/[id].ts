import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/dbConnect";
import ProductModel from "../../../models/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  await connect()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
  switch (method) {
    case "GET":
      await ProductModel.findById(id)
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch((err) => {
          res.status(400).json({ success: false });
        });
      break;
    case "PUT":
      await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch((err) => {
          res.status(400).json({ success: false });
        });
      break;
    case "DELETE":
      await ProductModel.findByIdAndDelete(id)
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch((err) => {
          res.status(400).json({ success: false });
        });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
export default handler;
