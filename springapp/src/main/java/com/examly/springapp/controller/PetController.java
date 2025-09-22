package com.examly.springapp.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Pet;
import com.examly.springapp.service.PetService;

import jakarta.validation.Valid;

@RestController
public class PetController {

    @Autowired
    PetService petService;

    @PostMapping("/api/pets")
    public ResponseEntity<Pet> postpet(@Valid @RequestBody Pet pet){
        Pet createdpet=petService.createPet(pet);
        URI loc=URI.create("/api/pets"+createdpet.getId());
        return ResponseEntity.created(loc).body(createdpet);
    }
    @GetMapping("/api/pets")
    public List<Pet> getall(){
        return petService.getAllPets();
    }
    @GetMapping("/api/pets/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        Optional<Pet> petdetail=petService.getPetById(id);
        if(petdetail.isPresent()){
            return ResponseEntity.ok(petdetail);
        }
        else{
            Map<String,String> err=new HashMap<>();
            err.put("message","Pet with ID "+id+" not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
        }
    }
}
