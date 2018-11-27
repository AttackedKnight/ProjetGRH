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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author fallougalass
 */
@Entity
@Table(name = "typepermission")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Typepermission.findAll", query = "SELECT t FROM Typepermission t")
    , @NamedQuery(name = "Typepermission.findById", query = "SELECT t FROM Typepermission t WHERE t.id = :id")
    , @NamedQuery(name = "Typepermission.findByLibelle", query = "SELECT t FROM Typepermission t WHERE t.libelle = :libelle")
    , @NamedQuery(name = "Typepermission.findByNombreDeJour", query = "SELECT t FROM Typepermission t WHERE t.nombreDeJour = :nombreDeJour")})
public class Typepermission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "libelle")
    private String libelle;
    @Column(name = "nombreDeJour")
    private Integer nombreDeJour;
    @OneToMany(mappedBy = "typePermission")
    private List<Absence> absenceList;

    public Typepermission() {
    }

    public Typepermission(Integer id) {
        this.id = id;
    }

    public Typepermission(Integer id, String libelle) {
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

    public Integer getNombreDeJour() {
        return nombreDeJour;
    }

    public void setNombreDeJour(Integer nombreDeJour) {
        this.nombreDeJour = nombreDeJour;
    }

    @XmlTransient
    public List<Absence> getAbsenceList() {
        return absenceList;
    }

    public void setAbsenceList(List<Absence> absenceList) {
        this.absenceList = absenceList;
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
        if (!(object instanceof Typepermission)) {
            return false;
        }
        Typepermission other = (Typepermission) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Typepermission[ id=" + id + " ]";
    }
    
}
