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
@Table(name = "civilite")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Civilite.findAll", query = "SELECT c FROM Civilite c")
    , @NamedQuery(name = "Civilite.findById", query = "SELECT c FROM Civilite c WHERE c.id = :id")
    , @NamedQuery(name = "Civilite.findByCode", query = "SELECT c FROM Civilite c WHERE c.code = :code")
    , @NamedQuery(name = "Civilite.findByLibelle", query = "SELECT c FROM Civilite c WHERE c.libelle = :libelle")})
public class Civilite implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @Column(name = "libelle")
    private String libelle;
    @JoinColumn(name = "Genre", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Genre genre;
    @JoinColumn(name = "SituationMatrimoniale", referencedColumnName = "id")
    @ManyToOne
    private Situationmatrimoniale situationMatrimoniale;

    public Civilite() {
    }

    public Civilite(Integer id) {
        this.id = id;
    }

    public Civilite(Integer id, String code, String libelle) {
        this.id = id;
        this.code = code;
        this.libelle = libelle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Situationmatrimoniale getSituationMatrimoniale() {
        return situationMatrimoniale;
    }

    public void setSituationMatrimoniale(Situationmatrimoniale situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
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
        if (!(object instanceof Civilite)) {
            return false;
        }
        Civilite other = (Civilite) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Civilite[ id=" + id + " ]";
    }
    
}
