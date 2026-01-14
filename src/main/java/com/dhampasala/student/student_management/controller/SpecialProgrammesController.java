package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.SpecialProgrammesDTO;
import com.dhampasala.student.student_management.service.SpecialProgrammesService;
@RestController
@RequestMapping("/specialProgrammes")
public class SpecialProgrammesController {
  @Autowired
    private SpecialProgrammesService specialProgrammesService;
    @PostMapping("/add")
    public void addSpecialProgramme(@RequestBody SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesService.addSpecialProgramme(specialProgrammesDTO);
    }
    @PostMapping("/update")
    public void updateSpecialProgramme(@RequestBody SpecialProgrammesDTO specialProgrammesDTO) {
        specialProgrammesService.updateSpecialProgramme(specialProgrammesDTO);
    }
    @PostMapping("/delete")
    public void deleteSpecialProgramme(@RequestBody SpecialProgrammesDTO specialProgrammesDTO){
        specialProgrammesService.deleteSpecialProgramme(specialProgrammesDTO);
    }
    @PostMapping("/search/{studentId}")
    public SpecialProgrammesDTO searchSpecialProgramme(@PathVariable String studentId){
        return specialProgrammesService.searchSpecialProgramme(studentId);
    }
    @PostMapping("/getAll")
    public List<SpecialProgrammesDTO> getAll(){
        return specialProgrammesService.getAll();
    }
}
