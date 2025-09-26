import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography, Alert } from "@mui/material";
import { createPet } from "../utils/api";

const PetForm = () => {
  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    description: "",
    imageUrl: "",
    adoptionStatus: "Available",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPet(pet);
      setSuccess("Pet added successfully!");
      setError("");
      setPet({
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        imageUrl: "",
        adoptionStatus: "Available",
      });
    } catch {
      setError("Failed to add pet");
      setSuccess("");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>Add New Pet</Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={pet.name} onChange={handleChange} required margin="normal"/>
        <TextField fullWidth select label="Species" name="species" value={pet.species} onChange={handleChange} required margin="normal">
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
        </TextField>
        <TextField fullWidth label="Breed" name="breed" value={pet.breed} onChange={handleChange} required margin="normal"/>
        <TextField fullWidth label="Age (months)" type="number" name="age" value={pet.age} onChange={handleChange} required margin="normal"/>
        <TextField fullWidth label="Description" name="description" value={pet.description} onChange={handleChange} multiline rows={3} margin="normal"/>
        <TextField fullWidth label="Image URL" name="imageUrl" value={pet.imageUrl} onChange={handleChange} margin="normal"/>
        <TextField fullWidth select label="Status" name="adoptionStatus" value={pet.adoptionStatus} onChange={handleChange} margin="normal">
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Pet</Button>
      </form>
    </Box>
  );
};

export default PetForm;
