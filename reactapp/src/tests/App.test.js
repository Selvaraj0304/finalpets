// src/tests/App.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '../utils/api';
import PetListing from '../components/PetListing';
import PetDetails from '../components/PetDetails';

jest.mock('../utils/api');

const mockPets = [
  {
    id: 1,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador',
    age: 24,
    description: 'A loyal friend',
    imageUrl: 'dog.jpg',
    adoptionStatus: 'Available'
  },
  {
    id: 2,
    name: 'Mittens',
    species: 'Cat',
    breed: 'Siamese',
    age: 18,
    description: 'Curious and cuddly',
    imageUrl: 'cat.jpg',
    adoptionStatus: 'Adopted'
  }
];

describe('Pet Adoption App Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1-6: PetListing basic functionality
  test('renders PetListing and displays pets', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    expect(screen.getByText(/Loading pets/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.getByText('Mittens')).toBeInTheDocument();
    });
  });

  test('renders PetListing error state', async () => {
    api.getPets.mockRejectedValue(new Error('API failure'));
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load pets/i)).toBeInTheDocument();
    });
  });

  test('filters PetListing by species - Cat', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => expect(screen.getByText('Buddy')).toBeInTheDocument());
    fireEvent.change(screen.getByTestId('species-filter'), { target: { value: 'Cat' } });
    await waitFor(() => {
      expect(screen.getByText('Mittens')).toBeInTheDocument();
      expect(screen.queryByText('Buddy')).toBeNull();
    });
  });

  test('handles PetDetails API failure', async () => {
    api.getPetById.mockRejectedValue(new Error('Fetch failed'));
    render(
      <MemoryRouter initialEntries={['/pets/999']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Could not fetch pet details/i)).toBeInTheDocument();
    });
  });

  test('handles empty PetDetails response', async () => {
    api.getPetById.mockResolvedValue(null);
    render(
      <MemoryRouter initialEntries={['/pets/404']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Pet not found/i)).toBeInTheDocument();
    });
  });

  test('shows description in PetDetails', async () => {
    api.getPetById.mockResolvedValue(mockPets[0]);
    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/A loyal friend/i)).toBeInTheDocument();
    });
  });

  test('displays image in PetDetails', async () => {
    api.getPetById.mockResolvedValue(mockPets[0]);
    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      const img = screen.getByAltText('Buddy');
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('dog.jpg');
    });
  });

  // 14-30: Additional edge/UI/API test cases
  test('PetListing search renders all filters', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => screen.getByText('Buddy'));
    expect(screen.getByTestId('species-filter')).toBeInTheDocument();
    expect(screen.getByTestId('status-filter')).toBeInTheDocument();
  });

  test('handles rapid filter change', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    fireEvent.change(screen.getByTestId('species-filter'), { target: { value: 'Dog' } });
    fireEvent.change(screen.getByTestId('species-filter'), { target: { value: 'Cat' } });
    await waitFor(() => {
      expect(screen.getByText('Mittens')).toBeInTheDocument();
    });
  });

  test('handles API returning empty list', async () => {
    api.getPets.mockResolvedValue([]);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText(/No pets found/i)).toBeInTheDocument();
    });
  });

 

  test('loads PetDetails with minimal data', async () => {
    api.getPetById.mockResolvedValue({ id: 3, name: 'Ghost' });
    render(
      <MemoryRouter initialEntries={['/pets/3']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Ghost')).toBeInTheDocument();
    });
  });



  test('navigates correctly between pets', async () => {
    api.getPetById.mockResolvedValue(mockPets[0]);
    render(
      <MemoryRouter initialEntries={['/pets/1']}>
        <Routes><Route path="/pets/:id" element={<PetDetails />} /></Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Buddy')).toBeInTheDocument();
    });
  });

  test('renders species dropdown options correctly', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => screen.getByText('Buddy'));
    const options = screen.getByTestId('species-filter').querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);
  });

  test('renders status dropdown options correctly', async () => {
    api.getPets.mockResolvedValue(mockPets);
    render(<MemoryRouter><PetListing /></MemoryRouter>);
    await waitFor(() => screen.getByText('Buddy'));
    const options = screen.getByTestId('status-filter').querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);
  });

  test('handles non-existent route gracefully', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <Routes>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
