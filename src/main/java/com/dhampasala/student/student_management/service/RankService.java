package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.RankDTO;
import com.dhampasala.student.student_management.model.entity.Rank;
import com.dhampasala.student.student_management.repository.RankRepo;
@Service
public class RankService {
    @Autowired
    private RankRepo rankRepo;
    public void addRank(RankDTO rankDTO){
        rankRepo.addRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public void updateRank(RankDTO rankDTO) {
        rankRepo.updateRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public void deleteRank(RankDTO rankDTO){
        rankRepo.deleteRank(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public RankDTO searchRank(String studentId){
        Rank rank=rankRepo.searchRank(studentId);
        return new RankDTO(rank.getStudentId(),rank.isPrefect(),rank.isClassMonitor(),rank.getOther(),rank.getMarks());
    }
    public List<RankDTO> getAll(){
        List<Rank>rankArray=rankRepo.getAll();
        List<RankDTO>rankDTOArray=new ArrayList<>();
        for(Rank rank:rankArray){
            rankDTOArray.add(new RankDTO(rank.getStudentId(),rank.isPrefect(),rank.isClassMonitor(),rank.getOther(),rank.getMarks()));
        }
        return rankDTOArray;
    }
}
