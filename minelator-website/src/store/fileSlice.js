import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFile = createAsyncThunk(
  'file/upload',
  async (blob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', blob);

      const response = await axios.post(
        'http://localhost:8000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', 
        }
      );

      const blobURL = window.URL.createObjectURL(response.data);
      return blobURL;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки файла');
    }
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    uploadedData: null,
    resultedDataURL: null, 
  },
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
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

        state.resultedDataURL = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.payload || 'Неизвестная ошибка';
        state.isError = true;
        state.isLoading = false;
        state.resultedDataURL = null;
      });
  },
});

export const { setFile } = fileSlice.actions;
export default fileSlice.reducer;
