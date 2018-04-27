/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

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
    })
public class Grade implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "duree")
    private int duree;
    @Basic(optional = false)
    @NotNull
    @Column(name = "indice")
    private int indice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "salaireBase")
    private int salaireBase;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "grade")
    private List<Historiquegrade> historiquegradeList;

   

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    
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

    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public int getIndice() {
        return indice;
    }

    public void setIndice(int indice) {
        this.indice = indice;
    }

    public int getSalaireBase() {
        return salaireBase;
    }

    public void setSalaireBase(int salaireBase) {
        this.salaireBase = salaireBase;
    }

    @XmlTransient
    public List<Historiquegrade> getHistoriquegradeList() {
        return historiquegradeList;
    }

    public void setHistoriquegradeList(List<Historiquegrade> historiquegradeList) {
        this.historiquegradeList = historiquegradeList;
    }
    
}
