/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Baba Mbengue
 */
@Entity
@Table(name = "conge")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Conge.findAll", query = "SELECT c FROM Conge c")
    , @NamedQuery(name = "Conge.findById", query = "SELECT c FROM Conge c WHERE c.id = :id")
    , @NamedQuery(name = "Conge.findByDateDebut", query = "SELECT c FROM Conge c WHERE c.dateDebut = :dateDebut")
    , @NamedQuery(name = "Conge.findByDateFin", query = "SELECT c FROM Conge c WHERE c.dateFin = :dateFin")
    , @NamedQuery(name = "Conge.findByDuree", query = "SELECT c FROM Conge c WHERE c.duree = :duree")
    , @NamedQuery(name = "Conge.findByDateEnregistrement", query = "SELECT c FROM Conge c WHERE c.dateEnregistrement = :dateEnregistrement")
    , @NamedQuery(name = "Conge.findByEtatTraitement", query = "SELECT c FROM Conge c WHERE c.etatTraitement = :etatTraitement")})
public class Conge implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateDebut")
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateFin")
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Basic(optional = false)
    @NotNull
    @Column(name = "duree")
    private int duree;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateEnregistrement")
    @Temporal(TemporalType.DATE)
    private Date dateEnregistrement;
    @Basic(optional = false)
    @NotNull
    @Column(name = "etatTraitement")
    private int etatTraitement;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @OneToMany(mappedBy = "conge")
    private List<Document> documentList;

    public Conge() {
    }

    public Conge(Integer id) {
        this.id = id;
    }

    public Conge(Integer id, Date dateDebut, Date dateFin, int duree, Date dateEnregistrement, int etatTraitement) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.duree = duree;
        this.dateEnregistrement = dateEnregistrement;
        this.etatTraitement = etatTraitement;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public Date getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(Date dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public int getEtatTraitement() {
        return etatTraitement;
    }

    public void setEtatTraitement(int etatTraitement) {
        this.etatTraitement = etatTraitement;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
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
        if (!(object instanceof Conge)) {
            return false;
        }
        Conge other = (Conge) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Conge[ id=" + id + " ]";
    }
    
}
