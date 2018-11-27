/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "mutuellesante")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Mutuellesante.findAll", query = "SELECT m FROM Mutuellesante m")
    , @NamedQuery(name = "Mutuellesante.findById", query = "SELECT m FROM Mutuellesante m WHERE m.id = :id")
    , @NamedQuery(name = "Mutuellesante.findByNom", query = "SELECT m FROM Mutuellesante m WHERE m.nom = :nom")
    , @NamedQuery(name = "Mutuellesante.findByCode", query = "SELECT m FROM Mutuellesante m WHERE m.code = :code")})
public class Mutuellesante implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "nom")
    private String nom;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "code")
    private String code;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mutuelleSante")
    private List<Membremutuelle> membremutuelleList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mutuelleSante")
    private List<Mutuellesantetypeemploye> mutuellesantetypeemployeList;

    public Mutuellesante() {
    }

    public Mutuellesante(Integer id) {
        this.id = id;
    }

    public Mutuellesante(Integer id, String nom, String code) {
        this.id = id;
        this.nom = nom;
        this.code = code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlTransient
    public List<Membremutuelle> getMembremutuelleList() {
        return membremutuelleList;
    }

    public void setMembremutuelleList(List<Membremutuelle> membremutuelleList) {
        this.membremutuelleList = membremutuelleList;
    }

    @XmlTransient
    public List<Mutuellesantetypeemploye> getMutuellesantetypeemployeList() {
        return mutuellesantetypeemployeList;
    }

    public void setMutuellesantetypeemployeList(List<Mutuellesantetypeemploye> mutuellesantetypeemployeList) {
        this.mutuellesantetypeemployeList = mutuellesantetypeemployeList;
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
        if (!(object instanceof Mutuellesante)) {
            return false;
        }
        Mutuellesante other = (Mutuellesante) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Mutuellesante[ id=" + id + " ]";
    }
    
}
