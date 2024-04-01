import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { motorbikeService } from "@/services/api/motorbike";
import { toast } from "react-toastify";

export const fetchMotorbikes = createAsyncThunk(
  "motorbike/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await motorbikeService.getAllMotorbikes();
      return res.data.motorbikes;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createMotorbike = createAsyncThunk(
  "motorbike/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await motorbikeService.createMotorbike(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateMotorbike = createAsyncThunk(
  "motorbike/update",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await motorbikeService.updateMotorbike(id, formData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMotorbike = createAsyncThunk(
  "motorbike/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await motorbikeService.deleteMotorbike(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

interface MotorbikeState {
  loading: boolean;
  motorbikes: any[];
  error: any;
}

const initialState: MotorbikeState = {
  loading: false,
  motorbikes: [],
  error: undefined,
};

const motorbikeSlice = createSlice({
  name: "motorbike",
  initialState,
  reducers: {
    resetMotorbikeState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMotorbikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMotorbikes.fulfilled, (state, action) => {
        state.loading = false;
        state.motorbikes = action.payload;
      })
      .addCase(fetchMotorbikes.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createMotorbike.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createMotorbike.fulfilled, (state, action) => {
        state.motorbikes.unshift(action.payload);
      })
      .addCase(createMotorbike.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(updateMotorbike.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateMotorbike.fulfilled, (state, action) => {
        const updatedMotorbikeIndex = state.motorbikes.findIndex(
          (motorbike) => motorbike._id === action.payload._id
        );
        if (updatedMotorbikeIndex !== -1) {
          state.motorbikes[updatedMotorbikeIndex] = action.payload;
        }
      })
      .addCase(updateMotorbike.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(deleteMotorbike.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteMotorbike.fulfilled, (state, action) => {
        state.motorbikes = state.motorbikes.filter(
          (motorbike) => motorbike._id !== action.payload._id
        );
      })
      .addCase(deleteMotorbike.rejected, (state, action) => {
        state.error = action.payload as any;
      });
  },
});

export const { resetMotorbikeState } = motorbikeSlice.actions;

export default motorbikeSlice.reducer;
