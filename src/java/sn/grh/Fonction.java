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
 * @author hp
 */
@Entity
@Table(name = "fonction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Fonction.findAll", query = "SELECT f FROM Fonction f")
    , @NamedQuery(name = "Fonction.findById", query = "SELECT f FROM Fonction f WHERE f.id = :id")
    , @NamedQuery(name = "Fonction.findByLibelle", query = "SELECT f FROM Fonction f WHERE f.libelle = :libelle")
    , @NamedQuery(name = "Fonction.findByResponsabilite", query = "SELECT f FROM Fonction f WHERE f.responsabilite = :responsabilite")})
public class Fonction implements Serializable {

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
    @Column(name = "responsabilite")
    private Boolean responsabilite;
    @OneToMany(mappedBy = "fonction")
    private List<Servir> servirList;

    public Fonction() {
    }

    public Fonction(Integer id) {
        this.id = id;
    }

    public Fonction(Integer id, String libelle) {
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

    public Boolean getResponsabilite() {
        return responsabilite;
    }

    public void setResponsabilite(Boolean responsabilite) {
        this.responsabilite = responsabilite;
    }

    @XmlTransient
    public List<Servir> getServirList() {
        return servirList;
    }

    public void setServirList(List<Servir> servirList) {
        this.servirList = servirList;
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
        if (!(object instanceof Fonction)) {
            return false;
        }
        Fonction other = (Fonction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Fonction[ id=" + id + " ]";
    }
    
}
