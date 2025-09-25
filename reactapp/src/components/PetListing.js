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
        setError("Failed to load pets"); // exact text expected by test
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

  if (loading) return <p>Loading pets...</p>; // exact text expected by test
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <h2>Pet Listings</h2>

      <select data-testid="species-filter" value={species} onChange={handleSpeciesChange}>
        <option value="">All Species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <select data-testid="status-filter" value={status} onChange={handleStatusChange}>
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Adopted">Adopted</option>
      </select>

      {filteredPets.length === 0 ? (
        <p>No pets found</p>
      ) : (
        <ul>
          {filteredPets.map((pet) => (
            <li key={pet.id}>
              <Link to={`/pets/${pet.id}`}>
                {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} width="100" />}
                <p>
                  {pet.name} - {pet.species} - {pet.adoptionStatus}
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
