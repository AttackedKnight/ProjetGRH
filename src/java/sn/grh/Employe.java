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
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Table(name = "employe")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Employe.findAll", query = "SELECT e FROM Employe e")
    , @NamedQuery(name = "Employe.findById", query = "SELECT e FROM Employe e WHERE e.id = :id")
    , @NamedQuery(name = "Employe.findByNumeroCni", query = "SELECT e FROM Employe e WHERE e.numeroCni = :numeroCni")
    , @NamedQuery(name = "Employe.findByMatriculeInterne", query = "SELECT e FROM Employe e WHERE e.matriculeInterne = :matriculeInterne")
    , @NamedQuery(name = "Employe.findByMatriculeCaisseSociale", query = "SELECT e FROM Employe e WHERE e.matriculeCaisseSociale = :matriculeCaisseSociale")
    , @NamedQuery(name = "Employe.findByPrenom", query = "SELECT e FROM Employe e WHERE e.prenom = :prenom")
    , @NamedQuery(name = "Employe.findByNom", query = "SELECT e FROM Employe e WHERE e.nom = :nom")
    , @NamedQuery(name = "Employe.findByDateDeNaissance", query = "SELECT e FROM Employe e WHERE e.dateDeNaissance = :dateDeNaissance")
    , @NamedQuery(name = "Employe.findByLieuDeNaissance", query = "SELECT e FROM Employe e WHERE e.lieuDeNaissance = :lieuDeNaissance")
    , @NamedQuery(name = "Employe.findBySexe", query = "SELECT e FROM Employe e WHERE e.sexe = :sexe")
    , @NamedQuery(name = "Employe.findByDateRecrutement", query = "SELECT e FROM Employe e WHERE e.dateRecrutement = :dateRecrutement")
    , @NamedQuery(name = "Employe.findByNationalite", query = "SELECT e FROM Employe e WHERE e.nationalite = :nationalite")
    , @NamedQuery(name = "Employe.findByNombreEnfant", query = "SELECT e FROM Employe e WHERE e.nombreEnfant = :nombreEnfant")
    , @NamedQuery(name = "Employe.findByNombreDeFemme", query = "SELECT e FROM Employe e WHERE e.nombreDeFemme = :nombreDeFemme")})
public class Employe implements Serializable {

    @JoinColumn(name = "Syndicat", referencedColumnName = "id")
    @ManyToOne
    private Syndicat syndicat;

//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
//    private List<Estmembre> estmembreList;

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "numeroCni")
    private String numeroCni;
    @Size(max = 255)
    @Column(name = "matriculeInterne")
    private String matriculeInterne;
    @Size(max = 45)
    @Column(name = "matriculeCaisseSociale")
    private String matriculeCaisseSociale;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "prenom")
    private String prenom;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "nom")
    private String nom;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateDeNaissance")
    @Temporal(TemporalType.DATE)
    private Date dateDeNaissance;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "lieuDeNaissance")
    private String lieuDeNaissance;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "sexe")
    private String sexe;
    @Column(name = "dateRecrutement")
    @Temporal(TemporalType.DATE)
    private Date dateRecrutement;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "nationalite")
    private String nationalite;
    @Column(name = "nombreEnfant")
    private Integer nombreEnfant;
    @Column(name = "nombreDeFemme")
    private Integer nombreDeFemme;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Absence> absenceList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Conge> congeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Document> documentList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Formation> formationList;
    @OneToMany(mappedBy = "employe")
    private List<Utilisateur> utilisateurList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Contact> contactList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Membremutuelle> membremutuelleList;
//    @OneToOne(cascade = CascadeType.ALL, mappedBy = "employe")
//    private Estmembre estmembre;
    @JoinColumn(name = "Civilite", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Civilite civilite;
    @JoinColumn(name = "SituationMatrimoniale", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Situationmatrimoniale situationMatrimoniale;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Avoircompetence> avoircompetenceList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Grade> gradeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Adresse> adresseList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Servir> servirList;

    public Employe() {
    }

    public Employe(Integer id) {
        this.id = id;
    }

    public Employe(Integer id, String numeroCni, String prenom, String nom, Date dateDeNaissance, String lieuDeNaissance, String sexe, String nationalite) {
        this.id = id;
        this.numeroCni = numeroCni;
        this.prenom = prenom;
        this.nom = nom;
        this.dateDeNaissance = dateDeNaissance;
        this.lieuDeNaissance = lieuDeNaissance;
        this.sexe = sexe;
        this.nationalite = nationalite;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumeroCni() {
        return numeroCni;
    }

    public void setNumeroCni(String numeroCni) {
        this.numeroCni = numeroCni;
    }

    public String getMatriculeInterne() {
        return matriculeInterne;
    }

    public void setMatriculeInterne(String matriculeInterne) {
        this.matriculeInterne = matriculeInterne;
    }

    public String getMatriculeCaisseSociale() {
        return matriculeCaisseSociale;
    }

    public void setMatriculeCaisseSociale(String matriculeCaisseSociale) {
        this.matriculeCaisseSociale = matriculeCaisseSociale;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(Date dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getLieuDeNaissance() {
        return lieuDeNaissance;
    }

    public void setLieuDeNaissance(String lieuDeNaissance) {
        this.lieuDeNaissance = lieuDeNaissance;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Date getDateRecrutement() {
        return dateRecrutement;
    }

    public void setDateRecrutement(Date dateRecrutement) {
        this.dateRecrutement = dateRecrutement;
    }

    public String getNationalite() {
        return nationalite;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }

    public Integer getNombreEnfant() {
        return nombreEnfant;
    }

    public void setNombreEnfant(Integer nombreEnfant) {
        this.nombreEnfant = nombreEnfant;
    }

    public Integer getNombreDeFemme() {
        return nombreDeFemme;
    }

    public void setNombreDeFemme(Integer nombreDeFemme) {
        this.nombreDeFemme = nombreDeFemme;
    }

    @XmlTransient
    public List<Absence> getAbsenceList() {
        return absenceList;
    }

    public void setAbsenceList(List<Absence> absenceList) {
        this.absenceList = absenceList;
    }

    @XmlTransient
    public List<Conge> getCongeList() {
        return congeList;
    }

    public void setCongeList(List<Conge> congeList) {
        this.congeList = congeList;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
    }

    @XmlTransient
    public List<Formation> getFormationList() {
        return formationList;
    }

    public void setFormationList(List<Formation> formationList) {
        this.formationList = formationList;
    }

    @XmlTransient
    public List<Utilisateur> getUtilisateurList() {
        return utilisateurList;
    }

    public void setUtilisateurList(List<Utilisateur> utilisateurList) {
        this.utilisateurList = utilisateurList;
    }

    @XmlTransient
    public List<Contact> getContactList() {
        return contactList;
    }

    public void setContactList(List<Contact> contactList) {
        this.contactList = contactList;
    }

    @XmlTransient
    public List<Membremutuelle> getMembremutuelleList() {
        return membremutuelleList;
    }

    public void setMembremutuelleList(List<Membremutuelle> membremutuelleList) {
        this.membremutuelleList = membremutuelleList;
    }

//    public Estmembre getEstmembre() {
//        return estmembre;
//    }
//
//    public void setEstmembre(Estmembre estmembre) {
//        this.estmembre = estmembre;
//    }

    public Civilite getCivilite() {
        return civilite;
    }

    public void setCivilite(Civilite civilite) {
        this.civilite = civilite;
    }

    public Situationmatrimoniale getSituationMatrimoniale() {
        return situationMatrimoniale;
    }

    public void setSituationMatrimoniale(Situationmatrimoniale situationMatrimoniale) {
        this.situationMatrimoniale = situationMatrimoniale;
    }

    public Typeemploye getTypeEmploye() {
        return typeEmploye;
    }

    public void setTypeEmploye(Typeemploye typeEmploye) {
        this.typeEmploye = typeEmploye;
    }

    @XmlTransient
    public List<Avoircompetence> getAvoircompetenceList() {
        return avoircompetenceList;
    }

    public void setAvoircompetenceList(List<Avoircompetence> avoircompetenceList) {
        this.avoircompetenceList = avoircompetenceList;
    }

    @XmlTransient
    public List<Grade> getGradeList() {
        return gradeList;
    }

    public void setGradeList(List<Grade> gradeList) {
        this.gradeList = gradeList;
    }

    @XmlTransient
    public List<Adresse> getAdresseList() {
        return adresseList;
    }

    public void setAdresseList(List<Adresse> adresseList) {
        this.adresseList = adresseList;
    }

    @XmlTransient
    public List<Servir> getServirList() {
        return servirList;
    }

    public void setServirList(List<Servir> servirList) {
        this.servirList = servirList;
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
        if (!(object instanceof Employe)) {
            return false;
        }
        Employe other = (Employe) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Employe[ id=" + id + " ]";
    }

//    @XmlTransient
//    public List<Estmembre> getEstmembreList() {
//        return estmembreList;
//    }
//
//    public void setEstmembreList(List<Estmembre> estmembreList) {
//        this.estmembreList = estmembreList;
//    }

    public Syndicat getSyndicat() {
        return syndicat;
    }

    public void setSyndicat(Syndicat syndicat) {
        this.syndicat = syndicat;
    }
    
}
