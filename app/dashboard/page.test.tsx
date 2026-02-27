import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from './page';
import favouritesReducer from '../lib/slices/gameSlice';
import { Game } from '../lib/interfaces/games';

// Mock dei dati di gioco
const mockGames: Partial<Game>[] = [
  {
    id: 1,
    name: 'Game 1',
    background_image: 'https://example.com/game1.jpg',
    rating: 4.5,
    released: '2023-01-01',
  },
  {
    id: 2,
    name: 'Game 2',
    background_image: 'https://example.com/game2.jpg',
    rating: 4.0,
    released: '2023-02-01',
  },
  {
    id: 3,
    name: 'Game 3',
    background_image: 'https://example.com/game3.jpg',
    rating: 3.5,
    released: '2023-03-01',
  },
];

// Funzione helper per creare uno store di test
function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      favourites: favouritesReducer,
    },
    preloadedState,
  });
}

// Mock della fetch globale
global.fetch = jest.fn();

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset del mock prima di ogni test
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders dashboard and loads games', async () => {
    // Mock della risposta API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    const store = createTestStore();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Attende che i giochi vengano caricati
    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Game 2')).toBeInTheDocument();
    expect(screen.getByText('Game 3')).toBeInTheDocument();
  });

  test('fetch games from API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    const store = createTestStore();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/games');
    });
  });

  test('adds game to favorites when clicking favorite button', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    const store = createTestStore();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Attende il caricamento dei giochi
    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    });

    // Trova tutti i bottoni per aggiungere ai favoriti
    const favoriteButtons = screen.getAllByRole('button', { name: /add to favourites/i });
    
    // Click sul primo bottone
    await userEvent.click(favoriteButtons[0]);

    // Verifica che il gioco sia stato aggiunto allo store
    const state = store.getState();
    expect(state.favourites).toHaveLength(1);
    expect(state.favourites[0].id).toBe(1);
    expect(state.favourites[0].name).toBe('Game 1');
  });

  test('removes game from favorites when clicking favorite button again', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    // Inizializza lo store con un gioco già nei favoriti
    const store = createTestStore({
      favourites: [mockGames[0]],
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    });

    // Trova il bottone per rimuovere dai favoriti (ora dovrebbe dire "remove")
    const favoriteButton = screen.getAllByRole('button', { name: /remove from favourites/i })[0];
    
    await userEvent.click(favoriteButton);

    // Verifica che il gioco sia stato rimosso dallo store
    const state = store.getState();
    expect(state.favourites).toHaveLength(0);
  });

  test('handles multiple favorites correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    const store = createTestStore();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    });

    const favoriteButtons = screen.getAllByRole('button', { name: /add to favourites/i });
    
    // Aggiungi i primi due giochi ai favoriti
    await userEvent.click(favoriteButtons[0]);
    await userEvent.click(favoriteButtons[1]);

    const state = store.getState();
    expect(state.favourites).toHaveLength(2);
    expect(state.favourites.map(g => g.id)).toEqual([1, 2]);
  });

  test('displays correct favorite status for each game', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    // Inizializza con Game 2 già nei favoriti
    const store = createTestStore({
      favourites: [mockGames[1]],
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Game 2')).toBeInTheDocument();
    });

    // Verifica che Game 1 e Game 3 abbiano il bottone "add"
    const addButtons = screen.getAllByRole('button', { name: /add to favourites/i });
    expect(addButtons).toHaveLength(2);

    // Verifica che Game 2 abbia il bottone "remove"
    const removeButtons = screen.getAllByRole('button', { name: /remove from favourites/i });
    expect(removeButtons).toHaveLength(1);
  });

  test('handles API error gracefully', async () => {
    // Mock di un errore API
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const store = createTestStore();

    // Sopprime l'errore della console per questo test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Aspetta un momento per assicurarsi che non ci siano giochi renderizzati
    await waitFor(() => {
      expect(screen.queryByText('Game 1')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test('renders grid layout correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: mockGames }),
    });

    const store = createTestStore();

    const { container } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
    });

    // Verifica che il layout grid sia presente
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1');
  });
});
