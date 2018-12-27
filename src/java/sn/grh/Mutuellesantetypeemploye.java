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
 * @author fallougalass
 */
@Entity
@Table(name = "mutuellesantetypeemploye")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Mutuellesantetypeemploye.findAll", query = "SELECT m FROM Mutuellesantetypeemploye m")
    , @NamedQuery(name = "Mutuellesantetypeemploye.findById", query = "SELECT m FROM Mutuellesantetypeemploye m WHERE m.id = :id")})
public class Mutuellesantetypeemploye implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "MutuelleSante", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Mutuellesante mutuelleSante;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;

    public Mutuellesantetypeemploye() {
    }

    public Mutuellesantetypeemploye(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Mutuellesante getMutuelleSante() {
        return mutuelleSante;
    }

    public void setMutuelleSante(Mutuellesante mutuelleSante) {
        this.mutuelleSante = mutuelleSante;
    }

    public Typeemploye getTypeEmploye() {
        return typeEmploye;
    }

    public void setTypeEmploye(Typeemploye typeEmploye) {
        this.typeEmploye = typeEmploye;
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
        if (!(object instanceof Mutuellesantetypeemploye)) {
            return false;
        }
        Mutuellesantetypeemploye other = (Mutuellesantetypeemploye) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Mutuellesantetypeemploye[ id=" + id + " ]";
    }
    
}
