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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author fallougalass
 */
@Entity
@Table(name = "absence")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Absence.findAll", query = "SELECT a FROM Absence a")
    , @NamedQuery(name = "Absence.findById", query = "SELECT a FROM Absence a WHERE a.id = :id")
    , @NamedQuery(name = "Absence.findByDateDebut", query = "SELECT a FROM Absence a WHERE a.dateDebut = :dateDebut")
    , @NamedQuery(name = "Absence.findByDuree", query = "SELECT a FROM Absence a WHERE a.duree = :duree")
    , @NamedQuery(name = "Absence.findByDateFin", query = "SELECT a FROM Absence a WHERE a.dateFin = :dateFin")
    , @NamedQuery(name = "Absence.findByEtatTraitement", query = "SELECT a FROM Absence a WHERE a.etatTraitement = :etatTraitement")
    , @NamedQuery(name = "Absence.findByDateEnregistrement", query = "SELECT a FROM Absence a WHERE a.dateEnregistrement = :dateEnregistrement")
    , @NamedQuery(name = "Absence.findByMotif", query = "SELECT a FROM Absence a WHERE a.motif = :motif")})
public class Absence implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateDebut")
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Basic(optional = false)
    @NotNull
    @Column(name = "duree")
    private int duree;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateFin")
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Basic(optional = false)
    @NotNull
    @Column(name = "etatTraitement")
    private int etatTraitement;
    @Column(name = "dateEnregistrement")
    @Temporal(TemporalType.DATE)
    private Date dateEnregistrement;
    @Size(max = 255)
    @Column(name = "motif")
    private String motif;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "TypeAutorisation", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeautorisation typeAutorisation;
    @JoinColumn(name = "TypeAbsence", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typepermission typeAbsence;
    @OneToMany(mappedBy = "absence")
    private List<Document> documentList;

    public Absence() {
    }

    public Absence(Integer id) {
        this.id = id;
    }

    public Absence(Integer id, Date dateDebut, int duree, Date dateFin, int etatTraitement) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.duree = duree;
        this.dateFin = dateFin;
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

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public int getEtatTraitement() {
        return etatTraitement;
    }

    public void setEtatTraitement(int etatTraitement) {
        this.etatTraitement = etatTraitement;
    }

    public Date getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(Date dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Typeautorisation getTypeAutorisation() {
        return typeAutorisation;
    }

    public void setTypeAutorisation(Typeautorisation typeAutorisation) {
        this.typeAutorisation = typeAutorisation;
    }

    public Typepermission getTypeAbsence() {
        return typeAbsence;
    }

    public void setTypeAbsence(Typepermission typeAbsence) {
        this.typeAbsence = typeAbsence;
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
        if (!(object instanceof Absence)) {
            return false;
        }
        Absence other = (Absence) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Absence[ id=" + id + " ]";
    }
    
}
