package com.dhampasala.student.student_management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        colorsRepo.save(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));
    }
    public void updateColors(ColorsDTO colorsDTO){
        colorsRepo.save(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));
    }
    public void deleteColors(ColorsDTO colorsDTO){
        colorsRepo.delete(new Colors(colorsDTO.getStudentID(),colorsDTO.getDinisuru(),colorsDTO.getRansilu(),colorsDTO.getPraknapradeepa(),colorsDTO.getSisumini(),colorsDTO.getSvarnavarna(),colorsDTO.getSvarnabushana()));

    }
    public Optional<ColorsDTO> searchColors(String studentId){
    return colorsRepo.findById(studentId)
            .map(dto -> new ColorsDTO(
                dto.getStudentID(),
                dto.getDinisuru(),
                dto.getRansilu(),
                dto.getPraknapradeepa(),
                dto.getSisumini(),
                dto.getSvarnavarna(),
                dto.getSvarnabushana()
            ));
}        
    public List<ColorsDTO> getAll(){
        List<ColorsDTO> colorDtoArray=new ArrayList<>();
        List<Colors> colorArray=colorsRepo.findAll();
        for(Colors colors:colorArray){
            colorDtoArray.add(new ColorsDTO(colors.getStudentID(),colors.getDinisuru(),colors.getRansilu(),colors.getPraknapradeepa(),colors.getSisumini(),colors.getSvarnavarna(),colors.getSvarnabushana()));
        }
        return colorDtoArray;
    }

}
