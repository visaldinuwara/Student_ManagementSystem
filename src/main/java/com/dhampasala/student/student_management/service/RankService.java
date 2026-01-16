package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        rankRepo.save(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public void updateRank(RankDTO rankDTO) {
        rankRepo.save(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public void deleteRank(RankDTO rankDTO){
        rankRepo.delete(new Rank(rankDTO.getStudentId(),rankDTO.isPrefect(),rankDTO.isClassMonitor(),rankDTO.getOther(),rankDTO.getMarks()));
    }
    public Optional<RankDTO> searchRank(String studentId){
        return rankRepo.findById(studentId).map(dto -> new RankDTO(dto.getStudentId(),dto.isPrefect(),dto.isClassMonitor(),dto.getOther(),dto.getMarks()));
    }
    public List<RankDTO> getAll(){
        List<Rank>rankArray=rankRepo.findAll();
        List<RankDTO>rankDTOArray=new ArrayList<>();
        for(Rank rank:rankArray){
            rankDTOArray.add(new RankDTO(rank.getStudentId(),rank.isPrefect(),rank.isClassMonitor(),rank.getOther(),rank.getMarks()));
        }
        return rankDTOArray;
    }
}
