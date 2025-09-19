package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Pet;
import com.examly.springapp.repository.PetRepository;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
    public Object getPetById(long l) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPetById'");
    }
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

}
