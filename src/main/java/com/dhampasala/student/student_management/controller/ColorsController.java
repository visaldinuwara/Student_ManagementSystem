package com.dhampasala.student.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhampasala.student.student_management.model.dto.ColorsDTO;
import com.dhampasala.student.student_management.model.entity.Colors;
import com.dhampasala.student.student_management.service.ColorsService;
@RestController
@RequestMapping("/colors")
public class ColorsController {
        @Autowired
    private ColorsService colorsService;
    @PostMapping("/save")
    public void addColors(@RequestBody ColorsDTO colorsDTO){
      colorsService.addColors(colorsDTO);
    }
    @PostMapping("/update")
    public void updateColors(@RequestBody ColorsDTO colorsDTO){
      colorsService.updateColors(colorsDTO);
    }
    @PostMapping("/delete")
    private void deleteColors(@RequestBody ColorsDTO colorsDTO){
      colorsService.updateColors(colorsDTO);
    }
    @GetMapping("/search/{studentId}")
    private Colors searchColors(@PathVariable String studentId){
      return colorsService.searchColors(studentId);
    }
    @GetMapping("/all")
    private List<ColorsDTO> getAll(){
      return colorsService.getAll();
    }
}
