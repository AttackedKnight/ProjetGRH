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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "caissesociale")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Caissesociale.findAll", query = "SELECT c FROM Caissesociale c")
    , @NamedQuery(name = "Caissesociale.findById", query = "SELECT c FROM Caissesociale c WHERE c.id = :id")
    , @NamedQuery(name = "Caissesociale.findByLibelle", query = "SELECT c FROM Caissesociale c WHERE c.libelle = :libelle")
    , @NamedQuery(name = "Caissesociale.findByCode", query = "SELECT c FROM Caissesociale c WHERE c.code = :code")})
public class Caissesociale implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "libelle")
    private String libelle;
    @Basic(optional = false)
    @Column(name = "code")
    private String code;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "caisseSociale")
    private List<Membrecaissesociale> membrecaissesocialeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "caisseSociale")
    private List<Caissesocialetypeemploye> caissesocialetypeemployeList;

    public Caissesociale() {
    }

    public Caissesociale(Integer id) {
        this.id = id;
    }

    public Caissesociale(Integer id, String libelle, String code) {
        this.id = id;
        this.libelle = libelle;
        this.code = code;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlTransient
    public List<Membrecaissesociale> getMembrecaissesocialeList() {
        return membrecaissesocialeList;
    }

    public void setMembrecaissesocialeList(List<Membrecaissesociale> membrecaissesocialeList) {
        this.membrecaissesocialeList = membrecaissesocialeList;
    }

    @XmlTransient
    public List<Caissesocialetypeemploye> getCaissesocialetypeemployeList() {
        return caissesocialetypeemployeList;
    }

    public void setCaissesocialetypeemployeList(List<Caissesocialetypeemploye> caissesocialetypeemployeList) {
        this.caissesocialetypeemployeList = caissesocialetypeemployeList;
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
        if (!(object instanceof Caissesociale)) {
            return false;
        }
        Caissesociale other = (Caissesociale) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Caissesociale[ id=" + id + " ]";
    }
    
}
