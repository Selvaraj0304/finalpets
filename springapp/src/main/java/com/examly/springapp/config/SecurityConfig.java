package com.examly.springapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder pswenc(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpRequest http) throws Exception{
        http
        .csrf().disable()
        .authorizeHttpRequests(auth->auth
        .requestMatchers("/register").permitAll()
        .requestMatchers("/login").permitAll()
        .anyRequest().authenticated()
        // anyRequest().permitAll()
        ).formLogin();
        return http.build();
    }
}

