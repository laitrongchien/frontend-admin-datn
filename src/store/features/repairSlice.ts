import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { repairService } from "@/services/api/repair";

export const fetchRepairs = createAsyncThunk(
  "repair/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await repairService.getAllRepairs();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createRepair = createAsyncThunk(
  "repair/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await repairService.createRepairMotorbike(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateRepair = createAsyncThunk(
  "repair/update",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await repairService.updateRepairMotorbike(id, formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

interface RepairState {
  loading: boolean;
  repairs: any[];
  error: any;
}

const initialState: RepairState = {
  loading: false,
  repairs: [],
  error: undefined,
};

const repairSlice = createSlice({
  name: "repair",
  initialState,
  reducers: {
    resetRepairState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepairs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepairs.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(fetchRepairs.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createRepair.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createRepair.fulfilled, (state, action) => {
        state.repairs.unshift(action.payload);
      })
      .addCase(createRepair.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(updateRepair.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateRepair.fulfilled, (state, action) => {
        const updatedRepairMotorIndex = state.repairs.findIndex(
          (repair) => repair._id === action.payload._id
        );
        if (updatedRepairMotorIndex !== -1) {
          state.repairs[updatedRepairMotorIndex] = action.payload;
        }
      })
      .addCase(updateRepair.rejected, (state, action) => {
        state.error = action.payload as any;
      });
  },
});

export const { resetRepairState } = repairSlice.actions;

export default repairSlice.reducer;
