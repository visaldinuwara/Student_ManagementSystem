package com.dhampasala.student.student_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.AccDetailsDTO;
import com.dhampasala.student.student_management.service.AccDetailsService;

@RestController
@RequestMapping("/api/AccDetails")
@CrossOrigin(origins = "*")
public class AccDetailsController {
      @Autowired
    private AccDetailsService sAccDetailsService;
    @PostMapping("/add")
    public void addAccDetails(@RequestBody AccDetailsDTO accDetails){
        System.out.println("AccDetails to add: " + accDetails);
        sAccDetailsService.addAccDetails(accDetails);
    }
    @PostMapping("/update")
    public void updateAccDetails(@RequestBody AccDetailsDTO accDetails) {
        sAccDetailsService.updateAccDetails(accDetails);
    }
    @PostMapping("/delete")
    public void deleteAccDetails(@RequestBody AccDetailsDTO accDetails){
        sAccDetailsService.deleteAccDetails(accDetails);
    }
    @GetMapping("/search/{userName}")
    public Optional<AccDetailsDTO> searchAccDetails(@PathVariable String userName){
        return sAccDetailsService.searchAccDetails(userName);
    }
    @GetMapping("/all")
    public List<AccDetailsDTO> getAll(){
        return sAccDetailsService.getAll();
    }

    }
