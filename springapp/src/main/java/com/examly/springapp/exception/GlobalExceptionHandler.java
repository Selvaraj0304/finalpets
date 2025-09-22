package com.examly.springapp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationerrors(MethodArgumentNotValidException ex){
        Map<String,Object> err=new HashMap<>();
        err.put("message","validation failed");
        err.put("errors",ex.getBindingResult().getFieldErrors().stream().map(
            val->val.getField()+":"+val.getDefaultMessage()).toList()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
    }
}
