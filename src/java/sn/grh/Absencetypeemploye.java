/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "absencetypeemploye")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Absencetypeemploye.findAll", query = "SELECT a FROM Absencetypeemploye a")
    , @NamedQuery(name = "Absencetypeemploye.findById", query = "SELECT a FROM Absencetypeemploye a WHERE a.id = :id")})
public class Absencetypeemploye implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;
    @JoinColumn(name = "typeAbsence", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeabsence typeAbsence;

    public Absencetypeemploye() {
    }

    public Absencetypeemploye(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Typeemploye getTypeEmploye() {
        return typeEmploye;
    }

    public void setTypeEmploye(Typeemploye typeEmploye) {
        this.typeEmploye = typeEmploye;
    }

    public Typeabsence getTypeAbsence() {
        return typeAbsence;
    }

    public void setTypeAbsence(Typeabsence typeAbsence) {
        this.typeAbsence = typeAbsence;
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
        if (!(object instanceof Absencetypeemploye)) {
            return false;
        }
        Absencetypeemploye other = (Absencetypeemploye) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Absencetypeemploye[ id=" + id + " ]";
    }
    
}
