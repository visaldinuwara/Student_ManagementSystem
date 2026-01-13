package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhampasala.student.student_management.model.dto.RankDTO;
import com.dhampasala.student.student_management.model.entity.Rank;
import com.dhampasala.student.student_management.repository.RankRepo;

public class RankService {
    @Autowired
    private RankRepo rankRepo;
    private void addRank(RankDTO rankDTO){
        rankRepo.addRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    private void updateRank(RankDTO rankDTO) {
        rankRepo.updateRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    private void deleteRank(RankDTO rankDTO){
        rankRepo.deleteRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    private RankDTO searchRank(String studentId){
        Rank rank=rankRepo.searchRank(studentId);
        return new RankDTO(rank.getStudentId(),rank.isPrefect(),rank.isClassMonitor(),rank.getOther(),rank.getMarks());
    }
    private List<RankDTO> getAll(){
        List<Rank>rankArray=rankRepo.getAll();
        List<RankDTO>rankDTOArray=new ArrayList<>();
        for(Rank rank:rankArray){
            rankDTOArray.add(new RankDTO(rank.getStudentId(),rank.isPrefect(),rank.isClassMonitor(),rank.getOther(),rank.getMarks()));
        }
        return rankDTOArray;
    }
}
