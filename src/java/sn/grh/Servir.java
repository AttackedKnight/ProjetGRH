/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author fallougalass
 */
@Entity
@Table(name = "servir")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Servir.findAll", query = "SELECT s FROM Servir s")
    , @NamedQuery(name = "Servir.findByResponsable", query = "SELECT s FROM Servir s WHERE s.responsable = :responsable")
    , @NamedQuery(name = "Servir.findByDebut", query = "SELECT s FROM Servir s WHERE s.debut = :debut")
    , @NamedQuery(name = "Servir.findByFin", query = "SELECT s FROM Servir s WHERE s.fin = :fin")
    , @NamedQuery(name = "Servir.findByDureeDuContrat", query = "SELECT s FROM Servir s WHERE s.dureeDuContrat = :dureeDuContrat")
    , @NamedQuery(name = "Servir.findById", query = "SELECT s FROM Servir s WHERE s.id = :id")})
public class Servir implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @NotNull
    @Column(name = "responsable")
    private boolean responsable;
    @Basic(optional = false)
    @NotNull
    @Column(name = "debut")
    @Temporal(TemporalType.DATE)
    private Date debut;
    @Column(name = "fin")
    @Temporal(TemporalType.DATE)
    private Date fin;
    @Column(name = "dureeDuContrat")
    private Integer dureeDuContrat;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Entite", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Entite entite;
    @JoinColumn(name = "Fonction", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Fonction fonction;
    @JoinColumn(name = "TypeContrat", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typecontrat typeContrat;

    public Servir() {
    }

    public Servir(Integer id) {
        this.id = id;
    }

    public Servir(Integer id, boolean responsable, Date debut) {
        this.id = id;
        this.responsable = responsable;
        this.debut = debut;
    }

    public boolean getResponsable() {
        return responsable;
    }

    public void setResponsable(boolean responsable) {
        this.responsable = responsable;
    }

    public Date getDebut() {
        return debut;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public Date getFin() {
        return fin;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public Integer getDureeDuContrat() {
        return dureeDuContrat;
    }

    public void setDureeDuContrat(Integer dureeDuContrat) {
        this.dureeDuContrat = dureeDuContrat;
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

    public Entite getEntite() {
        return entite;
    }

    public void setEntite(Entite entite) {
        this.entite = entite;
    }

    public Fonction getFonction() {
        return fonction;
    }

    public void setFonction(Fonction fonction) {
        this.fonction = fonction;
    }

    public Typecontrat getTypeContrat() {
        return typeContrat;
    }

    public void setTypeContrat(Typecontrat typeContrat) {
        this.typeContrat = typeContrat;
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
        if (!(object instanceof Servir)) {
            return false;
        }
        Servir other = (Servir) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Servir[ id=" + id + " ]";
    }
    
}
