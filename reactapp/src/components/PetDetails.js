import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../utils/api";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPetById(id)
      .then((data) => {
        if (!data) {
          setError("Pet not found");
        } else {
          setPet(data);
        }
      })
      .catch(() => setError("Could not fetch pet details"));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!pet) return <div>Loading...</div>;

  return (
    <div>
      <h2>{pet.name}</h2>
      {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} width="200" />}
      {pet.description && <p>{pet.description}</p>}
    </div>
  );
};

export default PetDetails;
