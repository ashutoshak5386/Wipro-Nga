import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// mock fetch — you can replace with real API
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  // simulate network
  await new Promise(r => setTimeout(r, 500));
  return [
    { id: 1, name: "Widget A", price: 49.99 },
    { id: 2, name: "Widget B", price: 29.99 }
  ];
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle" },
  reducers: {
    updateProduct(state, action) {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.status = "loading"; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, state => { state.status = "failed"; });
  }
});

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
