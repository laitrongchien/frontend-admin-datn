import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { motorIdentificationService } from "@/services/api/identification";

export const fetchMotorIdentifications = createAsyncThunk(
  "motorIdentification/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res =
        await motorIdentificationService.getAllMotorbikeIdentifications();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createMotorIdentification = createAsyncThunk(
  "motorIdentification/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await motorIdentificationService.createMotorIdentification(
        data
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const importMotorIdentification = createAsyncThunk(
  "motorIdentification/import",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await motorIdentificationService.importMotorIdentification(
        data
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMotorIdentification = createAsyncThunk(
  "motorIdentification/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await motorIdentificationService.updateMotorIdentification(
        data
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMotorIdentification = createAsyncThunk(
  "motorIdentification/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await motorIdentificationService.deleteMotorIdentification(
        id
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

interface MotorIdentificationState {
  loading: boolean;
  motorIdentifications: any[];
  error: any;
}

const initialState: MotorIdentificationState = {
  loading: false,
  motorIdentifications: [],
  error: undefined,
};

const motorIdentificationSlice = createSlice({
  name: "motorIdentification",
  initialState,
  reducers: {
    resetMotorIdentificationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMotorIdentifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMotorIdentifications.fulfilled, (state, action) => {
        state.loading = false;
        state.motorIdentifications = action.payload;
      })
      .addCase(fetchMotorIdentifications.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createMotorIdentification.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createMotorIdentification.fulfilled, (state, action) => {
        state.motorIdentifications.unshift(action.payload);
      })
      .addCase(createMotorIdentification.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(updateMotorIdentification.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateMotorIdentification.fulfilled, (state, action) => {
        const updatedMotorIdentificationIndex =
          state.motorIdentifications.findIndex(
            (motorIdentification) =>
              motorIdentification._id === action.payload._id
          );
        if (updatedMotorIdentificationIndex !== -1) {
          state.motorIdentifications[updatedMotorIdentificationIndex] =
            action.payload;
        }
      })
      .addCase(updateMotorIdentification.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(deleteMotorIdentification.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteMotorIdentification.fulfilled, (state, action) => {
        state.motorIdentifications = state.motorIdentifications.filter(
          (motorIdentification) =>
            motorIdentification._id !== action.payload._id
        );
      })
      .addCase(deleteMotorIdentification.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(importMotorIdentification.pending, (state) => {
        state.error = undefined;
      })
      .addCase(importMotorIdentification.fulfilled, (state, action) => {
        state.motorIdentifications = [
          ...action.payload,
          ...state.motorIdentifications,
        ];
      })
      .addCase(importMotorIdentification.rejected, (state, action) => {
        state.error = action.payload as any;
      });
  },
});

export const { resetMotorIdentificationState } =
  motorIdentificationSlice.actions;

export default motorIdentificationSlice.reducer;
