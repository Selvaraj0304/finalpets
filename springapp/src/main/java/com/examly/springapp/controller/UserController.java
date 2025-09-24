package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.UserService;
import com.examly.springapp.model.User;

@RestController
public class UserController {
    @Autowired
    UserService us;

    @PostMapping("/register")
    public User regUser(@RequestBody User detail){
        return us.saveuser(detail);
    }
    @GetMapping("/login")
    public String login(@RequestParam String username,@RequestParam String pass){
        User user=us.authenticate(username,pass);
        if(user!=null){
            return "Logged in";
        }
        else{
            return "Login failed";
        }
    }
}
