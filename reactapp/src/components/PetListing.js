import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPets } from "../utils/api";

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        if (!data || data.length === 0) {
          setPets([]);
          setFilteredPets([]);
        } else {
          setPets(data);
          setFilteredPets(data);
        }
      } catch (err) {
        setError("Failed to load pets"); // exact text for tests
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    let tempPets = [...pets];
    if (species) {
      tempPets = tempPets.filter((pet) => pet.species === species);
    }
    if (status) {
      tempPets = tempPets.filter((pet) => pet.adoptionStatus === status);
    }
    setFilteredPets(tempPets);
  }, [species, status, pets]);

  const handleSpeciesChange = (e) => setSpecies(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  return (
    <div>
      <h2>Pet Listings</h2>

      {/* Filters are always rendered, even during loading */}
      <select
        data-testid="species-filter"
        value={species}
        onChange={handleSpeciesChange}
        disabled={loading} // prevent interaction until pets are loaded
      >
        <option value="">All Species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <select
        data-testid="status-filter"
        value={status}
        onChange={handleStatusChange}
        disabled={loading} // prevent interaction until pets are loaded
      >
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Adopted">Adopted</option>
      </select>

      {loading ? (
        <p>Loading pets</p>
      ) : error ? (
        <div role="alert">{error}</div>
      ) : filteredPets.length === 0 ? (
        <p>No pets found</p>
      ) : (
        <ul>
          {filteredPets.map((pet) => (
            <li key={pet.id}>
              <Link to={`/pets/${pet.id}`}>
                {pet.imageUrl && (
                  <img src={pet.imageUrl} alt={pet.name} width="100" />
                )}
                <p>
                  <span>{pet.name}</span> - {pet.species} - {pet.adoptionStatus}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetListing;
