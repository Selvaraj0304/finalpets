import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPets } from "../utils/api";
import {
  Box,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  CardMedia,
} from "@mui/material";

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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
      } catch {
        setError("Failed to load pets");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    let temp = [...pets];
    if (species) temp = temp.filter((p) => p.species === species);
    if (status) temp = temp.filter((p) => p.adoptionStatus === status);
    if (search)
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (sort === "ageAsc") temp.sort((a, b) => a.age - b.age);
    if (sort === "ageDesc") temp.sort((a, b) => b.age - a.age);
    setFilteredPets(temp);
  }, [species, status, search, sort, pets]);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mb={3}
        justifyContent="space-between"
      >
        <TextField
          select
          label="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          fullWidth
          sx={{ minWidth: 180, flex: 1 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          sx={{ minWidth: 180, flex: 1 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>

        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ minWidth: 180, flex: 1 }}
        />

        <TextField
          select
          label="Sort by Age"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          fullWidth
          sx={{ minWidth: 180, flex: 1 }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ageAsc">Ascending</MenuItem>
          <MenuItem value="ageDesc">Descending</MenuItem>
        </TextField>
      </Box>

      {/* Pet Cards */}
      <Grid container spacing={3}>
        {filteredPets.length === 0 ? (
          <Typography>No pets found</Typography>
        ) : (
          filteredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                  cursor: "pointer",
                  borderRadius: 3,
                }}
              >
                {pet.imageUrl && (
                  <CardMedia
                    component="img"
                    height="220"
                    image={pet.imageUrl}
                    alt={pet.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pet.species} | {pet.breed} | {pet.age} months
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {pet.adoptionStatus}
                  </Typography>
                  <Box mt={1}>
                    <Link
                      to={`/pets/${pet.id}`}
                      style={{ textDecoration: "none", color: "#388E3C" }}
                    >
                      View Details
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PetListing;
