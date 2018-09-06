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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Baba Mbengue
 */
@Entity
@Table(name = "document")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Document.findAll", query = "SELECT d FROM Document d")
    , @NamedQuery(name = "Document.findById", query = "SELECT d FROM Document d WHERE d.id = :id")
    , @NamedQuery(name = "Document.findByDescription", query = "SELECT d FROM Document d WHERE d.description = :description")
    , @NamedQuery(name = "Document.findByDateEnregistrement", query = "SELECT d FROM Document d WHERE d.dateEnregistrement = :dateEnregistrement")
    , @NamedQuery(name = "Document.findByDateSignature", query = "SELECT d FROM Document d WHERE d.dateSignature = :dateSignature")
    , @NamedQuery(name = "Document.findByEcheance", query = "SELECT d FROM Document d WHERE d.echeance = :echeance")
    , @NamedQuery(name = "Document.findByEmplacement", query = "SELECT d FROM Document d WHERE d.emplacement = :emplacement")
    , @NamedQuery(name = "Document.findBySituationMatrimoniale", query = "SELECT d FROM Document d WHERE d.situationMatrimoniale = :situationMatrimoniale")})
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateEnregistrement")
    @Temporal(TemporalType.DATE)
    private Date dateEnregistrement;
    @Column(name = "dateSignature")
    @Temporal(TemporalType.DATE)
    private Date dateSignature;
    @Column(name = "echeance")
    @Temporal(TemporalType.DATE)
    private Date echeance;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "emplacement")
    private String emplacement;
    @Column(name = "situationMatrimoniale")
    private Boolean situationMatrimoniale;
    @JoinColumn(name = "Absence", referencedColumnName = "id")
    @ManyToOne
    private Absence absence;
    @JoinColumn(name = "AvoirCompetence", referencedColumnName = "id")
    @ManyToOne
    private Avoircompetence avoirCompetence;
    @JoinColumn(name = "Conge", referencedColumnName = "id")
    @ManyToOne
    private Conge conge;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Formation", referencedColumnName = "id")
    @ManyToOne
    private Formation formation;
    @JoinColumn(name = "TypeDocument", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typedocument typeDocument;

    public Document() {
    }

    public Document(Integer id) {
        this.id = id;
    }

    public Document(Integer id, String description, Date dateEnregistrement, String emplacement) {
        this.id = id;
        this.description = description;
        this.dateEnregistrement = dateEnregistrement;
        this.emplacement = emplacement;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateEnregistrement() {
        return dateEnregistrement;
    }

    public void setDateEnregistrement(Date dateEnregistrement) {
        this.dateEnregistrement = dateEnregistrement;
    }

    public Date getDateSignature() {
        return dateSignature;
    }

    public void setDateSignature(Date dateSignature) {
        this.dateSignature = dateSignature;
    }

    public Date getEcheance() {
        return echeance;
    }

    public void setEcheance(Date echeance) {
        this.echeance = echeance;
    }

    public String getEmplacement() {
        return emplacement;
    }

    public void setEmplacement(String emplacement) {
        this.emplacement = emplacement;
    }

    public Boolean getSituationMatrimoniale() {
        return situationMatrimoniale;
    }

    public void setSituationMatrimoniale(Boolean situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public Absence getAbsence() {
        return absence;
    }

    public void setAbsence(Absence absence) {
        this.absence = absence;
    }

    public Avoircompetence getAvoirCompetence() {
        return avoirCompetence;
    }

    public void setAvoirCompetence(Avoircompetence avoirCompetence) {
        this.avoirCompetence = avoirCompetence;
    }

    public Conge getConge() {
        return conge;
    }

    public void setConge(Conge conge) {
        this.conge = conge;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Typedocument getTypeDocument() {
        return typeDocument;
    }

    public void setTypeDocument(Typedocument typeDocument) {
        this.typeDocument = typeDocument;
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
        if (!(object instanceof Document)) {
            return false;
        }
        Document other = (Document) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Document[ id=" + id + " ]";
    }
    
}
