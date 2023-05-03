import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import authService from './helper/authHelper';
import State from '../types/AuthSlice';

const userString = localStorage.getItem('user');
const user = userString !== null ? JSON.parse(userString) : null;

// Login User
export const loginUser = createAsyncThunk(
  'loginUser',
  async (user: { email: string; password: string }, thunkAPI) => {
    console.log('user', user);
    try {
      const response = await authService.login(user);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: response.name,
          email: response.email,
          _id: response._id,
          isAdmin: response.isAdmin,
        })
      );
      console.log(response, 'reesponse');
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getsellerInfo = createAsyncThunk(
  'sellerInfo',
  async (thunkAPI: any) => {
    console.log('user', user);
    try {
      const response = await authService.getInfoHelper();
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSellerInfoById = createAsyncThunk(
  '/getSellerInfoById',
  async (id, thunkAPI: any) => {
    console.log(id, 'id getsellerinfo');
    try {
      const response = await authService.getSellerInfoHelper(id);
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

export const updateSellerProfile = createAsyncThunk(
  '/updateSellerProfile',
  async (profile: any, thunkAPI: any) => {
    try {
      const response = await authService.updateUserProfileHelper(profile);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSellerImage = createAsyncThunk(
  '/updateSellerImage',
  async ({ formData }: any, thunkAPI: any) => {
    try {
      const response = await authService.updateUserImageHelper({
        formData,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  'registerUser',
  async (user: any, thunkAPI: any) => {
    try {
      const response = await authService.register(user);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const VerifyEmailUser = createAsyncThunk(
  'VerifyEmailUser',
  async ({ id, token }: any, thunkAPI: any) => {
    try {
      return await authService.VerifyUser({ id, token });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ResetPasswordLink = createAsyncThunk(
  'post/resetPasswordLink',
  async (email: any, thunkAPI: any) => {
    try {
      console.log(email);
      return await authService.resetPasswordLink(email);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPasswordVerify = createAsyncThunk(
  'post/resetPasswordVerify',
  async ({ password, id, token }: any, thunkAPI: any) => {
    try {
      return await authService.resetPasswordVerify({ password, id, token });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetUserDetails = createAsyncThunk(
  'get/userDetails',
  async (thunkAPI: any) => {
    try {
      return await authService.GetUserDetails();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSellers = createAsyncThunk(
  'get/getSellers',
  async (thunkAPI: any) => {
    try {
      return await authService.GetSellers();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const initialState: State = {
  user: user ? user : null,
  userDetail: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  sellers: null,
  sellerInfo: {},
  sellerDetails: {},
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSellerInfoById.fulfilled, (state, action) => {
        state.sellerDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(getSellerInfoById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(getSellerInfoById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getsellerInfo.fulfilled, (state, action) => {
        state.sellerInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getsellerInfo.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(getsellerInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.isLoading = false;
        state.message = action.payload as string;
        Cookies.remove('connect.sid');
        localStorage.removeItem('user');
        state.user = null;
        state.userDetail = null;
      })
      .addCase(GetUserDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ResetPasswordLink.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(ResetPasswordLink.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(ResetPasswordLink.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordVerify.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(resetPasswordVerify.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(resetPasswordVerify.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(VerifyEmailUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(VerifyEmailUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(VerifyEmailUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSellers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.sellers = action.payload;
      })
      .addCase(getSellers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload as string;
      })
      .addCase(getSellers.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
