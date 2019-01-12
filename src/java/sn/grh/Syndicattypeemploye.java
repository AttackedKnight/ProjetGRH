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
@Table(name = "syndicattypeemploye")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Syndicattypeemploye.findAll", query = "SELECT s FROM Syndicattypeemploye s")
    , @NamedQuery(name = "Syndicattypeemploye.findById", query = "SELECT s FROM Syndicattypeemploye s WHERE s.id = :id")})
public class Syndicattypeemploye implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "Syndicat", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Syndicat syndicat;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;

    public Syndicattypeemploye() {
    }

    public Syndicattypeemploye(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Syndicat getSyndicat() {
        return syndicat;
    }

    public void setSyndicat(Syndicat syndicat) {
        this.syndicat = syndicat;
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
        if (!(object instanceof Syndicattypeemploye)) {
            return false;
        }
        Syndicattypeemploye other = (Syndicattypeemploye) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Syndicattypeemploye[ id=" + id + " ]";
    }
    
}
