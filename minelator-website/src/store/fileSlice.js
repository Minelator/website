import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при обработке файла.");
      }

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
      return { blobURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    resultedDataURL: null,
    file: null,
  },
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
      state.resultedDataURL = null;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.error = null;
        state.isError = false;
        state.isLoading = true;
        state.resultedDataURL = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.error = null;
        state.isError = false;
        state.isLoading = false;
        state.resultedDataURL = action.payload.blobURL;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.payload || "Неизвестная ошибка";
        state.isError = true;
        state.isLoading = false;
        state.resultedDataURL = null;
      });
  },
});

export const { setFile } = fileSlice.actions;
export default fileSlice.reducer;
