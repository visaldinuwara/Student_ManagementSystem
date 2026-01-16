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

import com.dhampasala.student.student_management.model.dto.RankDTO;
import com.dhampasala.student.student_management.service.RankService;
@RestController
@RequestMapping("/rank")
@CrossOrigin(origins = "*")
public class RankController {
      @Autowired
    private RankService rankService;
    @PostMapping("/save")
    public void addRank(@RequestBody RankDTO rankDTO){
      rankService.addRank(rankDTO);
    }
    @PostMapping("/update")
    public void updateRank(@RequestBody RankDTO rankDTO) {
      rankService.updateRank(rankDTO);
    }
    @PostMapping("/delete")
    public void deleteRank(@RequestBody RankDTO rankDTO){
      rankService.deleteRank(rankDTO);
    }
    @GetMapping("/search/{studentId}")
    public Optional<RankDTO> searchRank(@PathVariable String studentId){
        return rankService.searchRank(studentId);
    }
    @GetMapping("/all")
    public List<RankDTO> getAll(){
        return rankService.getAll();
    }
}
