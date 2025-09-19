package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Pet;
import com.examly.springapp.repository.PetRepository;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;
    public Pet create(Pet pet) {
        return petRepository.save(pet);
    }

}
