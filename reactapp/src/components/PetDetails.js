import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../utils/api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPetById(id);
        if (!response) {
          setError("Pet not found");
        } else {
          setPet(response);
        }
      } catch (err) {
        setError("Could not fetch pet details");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5">{pet.name}</Typography>
          {pet.description && (
            <Typography variant="body1">{pet.description}</Typography>
          )}
          {pet.imageUrl && (
            <img
              src={pet.imageUrl}
              alt={pet.name}
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
          {pet.species && (
            <Typography variant="body2">Species: {pet.species}</Typography>
          )}
          {pet.breed && (
            <Typography variant="body2">Breed: {pet.breed}</Typography>
          )}
          {pet.age && (
            <Typography variant="body2">Age: {pet.age} months</Typography>
          )}
          {pet.adoptionStatus && (
            <Typography variant="body2">
              Status: {pet.adoptionStatus}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetDetails;
