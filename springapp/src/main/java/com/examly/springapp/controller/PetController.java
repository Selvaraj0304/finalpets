package com.examly.springapp.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Pet;
import com.examly.springapp.service.PetService;

@RestController
public class PetController {

    @Autowired
    PetService petService;

    @PostMapping("/api/pets")
    public ResponseEntity<Pet> postpet(@RequestBody Pet pet){
        Pet createdpet=petService.createPet(pet);
        URI loc=URI.create("/api/pets"+createdpet.getId());
        return ResponseEntity.created(loc).body(createdpet);
    }
    @GetMapping("/api/pets")
    public List<Pet> getall(){
        return petService.getAllPets();
    }
    @GetMapping("/api/pets/{id}")
}
