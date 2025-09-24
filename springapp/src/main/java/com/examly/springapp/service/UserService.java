package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    PasswordEncoder ps;
    UserRepo repo;
    public User saveuser(User detail) {
       detail.setPassword(ps.encode(detail.getPassword()));
       return repo.save(detail);
    }

}
