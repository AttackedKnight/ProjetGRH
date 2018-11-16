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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Baba Mbengue
 */
@Entity
@Table(name = "membremutuelle")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Membremutuelle.findAll", query = "SELECT m FROM Membremutuelle m")
    , @NamedQuery(name = "Membremutuelle.findById", query = "SELECT m FROM Membremutuelle m WHERE m.id = :id")})
public class Membremutuelle implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "MutuelleSante", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Mutuellesante mutuelleSante;

    public Membremutuelle() {
    }

    public Membremutuelle(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Mutuellesante getMutuelleSante() {
        return mutuelleSante;
    }

    public void setMutuelleSante(Mutuellesante mutuelleSante) {
        this.mutuelleSante = mutuelleSante;
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
        if (!(object instanceof Membremutuelle)) {
            return false;
        }
        Membremutuelle other = (Membremutuelle) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Membremutuelle[ id=" + id + " ]";
    }
    
}
