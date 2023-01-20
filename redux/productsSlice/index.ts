import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../utils/types";

export const fetchAllProducts = createAsyncThunk(
  "product/allProducts",
  async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    return data;
  }
);

interface ProductState {
  products: Product[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  products: [],
  loading: "idle",
} as ProductState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default productsSlice.reducer;
// export {} = productsSlice.actions;
