package com.examly.springapp.service;

import java.util.Optional;

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
    @Autowired
    UserRepo repo;
    public User saveuser(User detail) {
       detail.setPassword(ps.encode(detail.getPassword()));
       return repo.save(detail);
    }
    public User authenticate(String username, String pass) {
       Optional<User> us=repo.findByUsername(username);
       if(us.isPresent()){
        User userdata=us.get();
        if(ps.matches(pass, userdata.getPassword())){
            return userdata;
        }
       }
       return null;
    }
}
