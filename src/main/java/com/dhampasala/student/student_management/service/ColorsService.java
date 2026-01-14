package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhampasala.student.student_management.model.dto.ColorsDTO;
import com.dhampasala.student.student_management.model.entity.Colors;
import com.dhampasala.student.student_management.repository.ColorsRepository;
@Service
public class ColorsService {
      @Autowired
    private ColorsRepository colorsRepo;
    public void addColors(ColorsDTO colorsDTO){
        colorsRepo.addColors(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));
    }
    public void updateColors(ColorsDTO colorsDTO){
        colorsRepo.updateColors(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));
    }
    public void deleteColors(ColorsDTO colorsDTO){
        colorsRepo.deleteColors(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));

    }
    public Colors searchColors(String studentId){
        Colors colors=colorsRepo.searchColors(studentId);
        return new Colors(colors.getStudentID(),colors.getDinisuru(),colors.getRansilu(),colors.getPraknapradeepa(),colors.getSisumini(),colors.getSvarnavarna(),colors.getSvarnabushana());
    }
    public List<ColorsDTO> getAll(){
        List<ColorsDTO> colorDtoArray=new ArrayList<>();
        List<Colors> colorArray=colorsRepo.getAll();
        for(Colors colors:colorArray){
            colorDtoArray.add(new ColorsDTO(colors.getStudentID(),colors.getDinisuru(),colors.getRansilu(),colors.getPraknapradeepa(),colors.getSisumini(),colors.getSvarnavarna(),colors.getSvarnabushana()));
        }
        return colorDtoArray;
    }

}
