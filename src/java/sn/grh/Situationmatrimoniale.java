/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "situationmatrimoniale")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Situationmatrimoniale.findAll", query = "SELECT s FROM Situationmatrimoniale s")
    , @NamedQuery(name = "Situationmatrimoniale.findById", query = "SELECT s FROM Situationmatrimoniale s WHERE s.id = :id")
    , @NamedQuery(name = "Situationmatrimoniale.findByLibelle", query = "SELECT s FROM Situationmatrimoniale s WHERE s.libelle = :libelle")})
public class Situationmatrimoniale implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "libelle")
    private String libelle;
    @OneToMany(mappedBy = "situationMatrimoniale")
    private List<Civilite> civiliteList;
    @OneToMany(mappedBy = "situationMatrimoniale")
    private List<Employe> employeList;

    public Situationmatrimoniale() {
    }

    public Situationmatrimoniale(Integer id) {
        this.id = id;
    }

    public Situationmatrimoniale(Integer id, String libelle) {
        this.id = id;
        this.libelle = libelle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @XmlTransient
    public List<Civilite> getCiviliteList() {
        return civiliteList;
    }

    public void setCiviliteList(List<Civilite> civiliteList) {
        this.civiliteList = civiliteList;
    }

    @XmlTransient
    public List<Employe> getEmployeList() {
        return employeList;
    }

    public void setEmployeList(List<Employe> employeList) {
        this.employeList = employeList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Situationmatrimoniale)) {
            return false;
        }
        Situationmatrimoniale other = (Situationmatrimoniale) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Situationmatrimoniale[ id=" + id + " ]";
    }
    
}
