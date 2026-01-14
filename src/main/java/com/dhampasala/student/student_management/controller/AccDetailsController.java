package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class AccDetailsController {
      @Autowired
    private AccDetailsService sAccDetailsService;
    @PostMapping("/add")
    private void addAccDetails(@RequestBody AccDetailsDTO accDetails){
        sAccDetailsService.addAccDetails(accDetails);
    }
    @PostMapping("/update")
    private void updateAccDetails(@RequestBody AccDetailsDTO accDetails) {
        sAccDetailsService.updateAccDetails(accDetails);
    }
    @PostMapping("/delete")
    private void deleteAccDetails(@RequestBody AccDetailsDTO accDetails){
        sAccDetailsService.deleteAccDetails(accDetails);
    }
    @GetMapping("/search/{userName}")
    private AccDetailsDTO searchAccDetails(@PathVariable String userName){
        return sAccDetailsService.searchAccDetails(userName);
    }
    @GetMapping("/all")
    private List<AccDetailsDTO> getAll(){
        return sAccDetailsService.getAll();
    }

    }
