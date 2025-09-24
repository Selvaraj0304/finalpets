package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class PetAdoptionManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetAdoptionManagementSystemApplication.class, args);
		System.out.println(new BCryptPasswordEncoder().encode("selva@123"));
	}

}
