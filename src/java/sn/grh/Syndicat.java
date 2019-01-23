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
@Table(name = "syndicat")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Syndicat.findAll", query = "SELECT s FROM Syndicat s")
    , @NamedQuery(name = "Syndicat.findById", query = "SELECT s FROM Syndicat s WHERE s.id = :id")
    , @NamedQuery(name = "Syndicat.findByNomSyndicat", query = "SELECT s FROM Syndicat s WHERE s.nomSyndicat = :nomSyndicat")
    , @NamedQuery(name = "Syndicat.findByCode", query = "SELECT s FROM Syndicat s WHERE s.code = :code")})
public class Syndicat implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "nomSyndicat")
    private String nomSyndicat;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "code")
    private String code;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "syndicat")
    private List<Membresyndicat> membresyndicatList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "syndicat")
    private List<Syndicattypeemploye> syndicattypeemployeList;

    public Syndicat() {
    }

    public Syndicat(Integer id) {
        this.id = id;
    }

    public Syndicat(Integer id, String nomSyndicat, String code) {
        this.id = id;
        this.nomSyndicat = nomSyndicat;
        this.code = code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomSyndicat() {
        return nomSyndicat;
    }

    public void setNomSyndicat(String nomSyndicat) {
        this.nomSyndicat = nomSyndicat;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlTransient
    public List<Membresyndicat> getMembresyndicatList() {
        return membresyndicatList;
    }

    public void setMembresyndicatList(List<Membresyndicat> membresyndicatList) {
        this.membresyndicatList = membresyndicatList;
    }

    @XmlTransient
    public List<Syndicattypeemploye> getSyndicattypeemployeList() {
        return syndicattypeemployeList;
    }

    public void setSyndicattypeemployeList(List<Syndicattypeemploye> syndicattypeemployeList) {
        this.syndicattypeemployeList = syndicattypeemployeList;
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
        if (!(object instanceof Syndicat)) {
            return false;
        }
        Syndicat other = (Syndicat) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Syndicat[ id=" + id + " ]";
    }
    
}
