import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tourService } from "@/services/api/tour";

export const fetchTours = createAsyncThunk(
  "tour/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await tourService.getAllTours();
      return res.data.tours;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createTour = createAsyncThunk(
  "tour/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await tourService.createTour(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/update",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await tourService.updateTour(id, formData);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await tourService.deleteTour(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

interface TourState {
  loading: boolean;
  tours: any[];
  error: any;
}

const initialState: TourState = {
  tours: [],
  loading: false,
  error: undefined,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    resetTourState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.tours.unshift(action.payload);
      })
      .addCase(createTour.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTour.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        const updatedTourIndex = state.tours.findIndex(
          (tour) => tour._id === action.payload._id
        );
        if (updatedTourIndex !== -1) {
          state.tours[updatedTourIndex] = action.payload;
        }
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(deleteTour.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.tours = state.tours.filter(
          (tour) => tour._id !== action.payload._id
        );
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.error = action.payload as any;
      });
  },
});

export const { resetTourState } = tourSlice.actions;

export default tourSlice.reducer;
