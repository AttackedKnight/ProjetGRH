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
@Table(name = "caissesocialetypeemploye")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Caissesocialetypeemploye.findAll", query = "SELECT c FROM Caissesocialetypeemploye c")
    , @NamedQuery(name = "Caissesocialetypeemploye.findById", query = "SELECT c FROM Caissesocialetypeemploye c WHERE c.id = :id")})
public class Caissesocialetypeemploye implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "CaisseSociale", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Caissesociale caisseSociale;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;

    public Caissesocialetypeemploye() {
    }

    public Caissesocialetypeemploye(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Caissesociale getCaisseSociale() {
        return caisseSociale;
    }

    public void setCaisseSociale(Caissesociale caisseSociale) {
        this.caisseSociale = caisseSociale;
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
        if (!(object instanceof Caissesocialetypeemploye)) {
            return false;
        }
        Caissesocialetypeemploye other = (Caissesocialetypeemploye) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Caissesocialetypeemploye[ id=" + id + " ]";
    }
    
}
