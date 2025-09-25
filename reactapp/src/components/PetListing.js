import React, { useEffect, useState } from "react";
import { getPets } from "../utils/api";
import { Link } from "react-router-dom";

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load pets");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = pets;
    if (species) results = results.filter((p) => p.species === species);
    if (status) results = results.filter((p) => p.adoptionStatus === status);
    setFiltered(results);
  }, [species, status, pets]);

  if (loading) return <div>Loading pets...</div>;
  if (error) return <div>{error}</div>;
  if (filtered.length === 0) return <div>No pets found</div>;

  const speciesOptions = [...new Set(pets.map((p) => p.species))];
  const statusOptions = [...new Set(pets.map((p) => p.adoptionStatus))];

  return (
    <div>
      <h2>Pet Listings</h2>
      <select
        data-testid="species-filter"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      >
        <option value="">All Species</option>
        {speciesOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        data-testid="status-filter"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <ul>
        {filtered.map((pet) => (
          <li key={pet.id}>
            <Link to={`/pets/${pet.id}`}>
              <img src={pet.imageUrl} alt={pet.name} width="100" />
              <p>{pet.name} - {pet.species} - {pet.adoptionStatus}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetListing;
