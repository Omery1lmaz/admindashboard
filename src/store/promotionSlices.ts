import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import promotionService from './helper/promotionHelper';
import {
  errorNotification,
  successNotification,
} from '../services/notificationHelper';

// getPromotionsBySeller User
export const getPromotionsBySeller = createAsyncThunk(
  '/getPromotionsBySeller',
  async (thunkAPI) => {
    try {
      const response = await promotionService.getPromotionsBySeller();
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const initialState: any = {
  promotions: [],
  promotion: {},
  isLoading: false,
  isError: false,
};

// Then, handle actions in your reducers:
const promotionSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotionsBySeller.fulfilled, (state, action) => {
        state.promotions = action.payload;
        state.isLoading = false;
      })
      .addCase(getPromotionsBySeller.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(getPromotionsBySeller.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default promotionSlice.reducer;
