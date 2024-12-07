import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["file/uploadFile", "file/setFile", "file/uploadFile/fulfilled"],
        ignoredPaths: ["file.file", "file.resultedData", "payload.blob"],
      },
    }),
  reducer: {
    file: fileReducer,
  },
});

export default store;
