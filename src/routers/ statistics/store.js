import { configureStore } from '@reduxjs/toolkit';
import { reportApi } from '../../redux/rePortApi'; // Avval yaratilgan API slice'ingiz

export const store = configureStore({
  reducer: {
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reportApi.middleware),
});