import favouritesReducer from './slices/gameSlice'
import { configureStore } from '@reduxjs/toolkit'
import { gamesApi } from "./services/gamesApi";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
})

/*
quanodo facciamo favourite:favouriteReducer, stiamo dicendo che nello store redux crea uno stato globale fatto da
favourites:[]
*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;