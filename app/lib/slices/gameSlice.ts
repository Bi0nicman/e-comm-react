import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../interfaces/games';

interface GamesStore {
  id: number
  name: string
}

const initialState: GamesStore[] = [];

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavoriteGame(state, action: PayloadAction<Game>) {
      // evita duplicati
      const exists = state.some(g => g.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    removeFavoriteGame(state, action: PayloadAction<number>) {
      // qui action.payload è l'id
      return state.filter(game => game.id !== action.payload);
    },
  }
})

export const { addFavoriteGame, removeFavoriteGame } = favouritesSlice.actions;
export default favouritesSlice.reducer; // export del reducer, lo importeremo nello store tramite alias favouriteReducer

/*
Quando facciamo l'esport del reducer, lo facciamo con export default, stiamo esportando
una sola funzione (state = initialState, action) => nextState
*/

