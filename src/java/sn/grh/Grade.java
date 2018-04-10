/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author fallougalass
 */
@Entity
@Table(name = "grade")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Grade.findAll", query = "SELECT g FROM Grade g")
    , @NamedQuery(name = "Grade.findById", query = "SELECT g FROM Grade g WHERE g.id = :id")
    , @NamedQuery(name = "Grade.findByDateDePassage", query = "SELECT g FROM Grade g WHERE g.dateDePassage = :dateDePassage")})
public class Grade implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "encours")
    private boolean encours;

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateDePassage")
    @Temporal(TemporalType.DATE)
    private Date dateDePassage;
    @JoinColumn(name = "Categorie", referencedColumnName = "id")
    @ManyToOne
    private Categorie categorie;
    @JoinColumn(name = "Classe", referencedColumnName = "id")
    @ManyToOne
    private Classe classe;
    @JoinColumn(name = "Corps", referencedColumnName = "id")
    @ManyToOne
    private Corps corps;
    @JoinColumn(name = "Echelon", referencedColumnName = "id")
    @ManyToOne
    private Echelon echelon;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Niveau", referencedColumnName = "id")
    @ManyToOne
    private Niveau niveau;
    @JoinColumn(name = "TypeAvancement", referencedColumnName = "id")
    @ManyToOne
    private Typeavancement typeAvancement;

    public Grade() {
    }

    public Grade(Integer id) {
        this.id = id;
    }

    public Grade(Integer id, Date dateDePassage) {
        this.id = id;
        this.dateDePassage = dateDePassage;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateDePassage() {
        return dateDePassage;
    }

    public void setDateDePassage(Date dateDePassage) {
        this.dateDePassage = dateDePassage;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Classe getClasse() {
        return classe;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    public Corps getCorps() {
        return corps;
    }

    public void setCorps(Corps corps) {
        this.corps = corps;
    }

    public Echelon getEchelon() {
        return echelon;
    }

    public void setEchelon(Echelon echelon) {
        this.echelon = echelon;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public Typeavancement getTypeAvancement() {
        return typeAvancement;
    }

    public void setTypeAvancement(Typeavancement typeAvancement) {
        this.typeAvancement = typeAvancement;
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
        if (!(object instanceof Grade)) {
            return false;
        }
        Grade other = (Grade) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Grade[ id=" + id + " ]";
    }

    public boolean getEncours() {
        return encours;
    }

    public void setEncours(boolean encours) {
        this.encours = encours;
    }
    
}
