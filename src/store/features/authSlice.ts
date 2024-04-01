import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "@/services/api/auth";
import { setUser, removeUser } from "@/utils/storage";
import { toast } from "react-toastify";
// import { userService } from "@/services/api/user";

interface FormData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const res = await authService.login(data);
      if (res.data.role === "admin") {
        setUser(res.data);
        return res.data;
      } else toast.error("Đăng nhập thất bại");
    } catch (error: any) {
      toast.error("Đăng nhập thất bại");
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const updateProfile = createAsyncThunk(
//   "user/update-profile",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const res = await userService.updateProfile(data);
//       toast.success("Cập nhật thông tin thành công");
//       return res.data;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  removeUser();
});

interface AuthState {
  loading: boolean;
  user: any | null;
  error: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    });
    // builder.addCase(updateProfile.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(updateProfile.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // });
    // builder.addCase(updateProfile.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export default authSlice.reducer;
