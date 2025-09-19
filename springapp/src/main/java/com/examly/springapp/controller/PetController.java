package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PetController {

    @PostMapping("/api/pets")
    public Pet postpet(){

    }
}
