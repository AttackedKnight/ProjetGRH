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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
 * @author hp
 */
@Entity
@Table(name = "servir")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Servir.findAll", query = "SELECT s FROM Servir s")
    , @NamedQuery(name = "Servir.findById", query = "SELECT s FROM Servir s WHERE s.id = :id")
    , @NamedQuery(name = "Servir.findByResponsable", query = "SELECT s FROM Servir s WHERE s.responsable = :responsable")
    , @NamedQuery(name = "Servir.findByDebut", query = "SELECT s FROM Servir s WHERE s.debut = :debut")
    , @NamedQuery(name = "Servir.findByFin", query = "SELECT s FROM Servir s WHERE s.fin = :fin")
    , @NamedQuery(name = "Servir.findByDureeDuContrat", query = "SELECT s FROM Servir s WHERE s.dureeDuContrat = :dureeDuContrat")
    , @NamedQuery(name = "Servir.findByFinService", query = "SELECT s FROM Servir s WHERE s.finService = :finService")})
public class Servir implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "responsable")
    private Boolean responsable;
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
    @Basic(optional = false)
    @NotNull
    @Column(name = "finService")
    private boolean finService;
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
    @ManyToOne
    private Typecontrat typeContrat;

    public Servir() {
    }

    public Servir(Integer id) {
        this.id = id;
    }

    public Servir(Integer id, Date debut, boolean finService) {
        this.id = id;
        this.debut = debut;
        this.finService = finService;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getResponsable() {
        return responsable;
    }

    public void setResponsable(Boolean responsable) {
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

    public boolean getFinService() {
        return finService;
    }

    public void setFinService(boolean finService) {
        this.finService = finService;
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
