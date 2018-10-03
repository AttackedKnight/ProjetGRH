/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.otherclasse;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import sn.grh.Grade;

/**
 *
 * @author fallougalass
 */
@XmlRootElement
public class GradeByGroupe {
    
    String libelle;
    protected List<Grade> grades;

    public GradeByGroupe(String libelle, List<Grade> grades) {
        this.libelle = libelle;
        this.grades = grades;
    }

    public String getLibelle() {
        return libelle;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    @Override
    public String toString() {
        return "GradeByGroupe{" + "libelle=" + libelle + ", grades=" + grades + '}';
    }

    
    
    
}
