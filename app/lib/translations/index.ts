// Dizionario delle traduzioni
export const translations = {
  'en-US': {
    favouritesList: 'Favourites List',
    noFavourites: 'No favourites yet',
  },
  'en-EN': {
    favouritesList: 'Favourites List',
    noFavourites: 'No favourites yet',
  },
  'it-IT': {
    favouritesList: 'Lista Preferiti',
    noFavourites: 'Nessun preferito ancora',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations['en-US'];
