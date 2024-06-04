import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { locationService } from "@/services/api/location";

export const fetchLocations = createAsyncThunk(
  "location/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await locationService.getAllLocations();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await locationService.createLocation(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/update",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await locationService.updateLocation(id, formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await locationService.deleteLocation(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

interface LocationState {
  loading: boolean;
  locations: any[];
  error: any;
}

const initialState: LocationState = {
  loading: false,
  locations: [],
  error: undefined,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetLocationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createLocation.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.locations.unshift(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(updateLocation.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const updatedLocationMotorIndex = state.locations.findIndex(
          (location) => location._id === action.payload._id
        );
        if (updatedLocationMotorIndex !== -1) {
          state.locations[updatedLocationMotorIndex] = action.payload;
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.error = action.payload as any;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.error = undefined;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(
          (location) => location._id !== action.payload._id
        );
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.error = action.payload as any;
      });
  },
});

export const { resetLocationState } = locationSlice.actions;

export default locationSlice.reducer;
