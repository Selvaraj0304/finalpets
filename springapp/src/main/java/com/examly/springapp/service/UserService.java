package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;

@Service
public class UserService {

    public User saveuser(User detail) {
       detail.setPassword();
    }

}
