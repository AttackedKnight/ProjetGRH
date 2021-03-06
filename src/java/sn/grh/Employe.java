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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "employe")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Employe.findAll", query = "SELECT e FROM Employe e")
    , @NamedQuery(name = "Employe.findById", query = "SELECT e FROM Employe e WHERE e.id = :id")
    , @NamedQuery(name = "Employe.findByNumeroCni", query = "SELECT e FROM Employe e WHERE e.numeroCni = :numeroCni")
    , @NamedQuery(name = "Employe.findByMatriculeInterne", query = "SELECT e FROM Employe e WHERE e.matriculeInterne = :matriculeInterne")
    , @NamedQuery(name = "Employe.findByMatriculeMainDoeuvre", query = "SELECT e FROM Employe e WHERE e.matriculeMainDoeuvre = :matriculeMainDoeuvre")
    , @NamedQuery(name = "Employe.findByPrenom", query = "SELECT e FROM Employe e WHERE e.prenom = :prenom")
    , @NamedQuery(name = "Employe.findByNom", query = "SELECT e FROM Employe e WHERE e.nom = :nom")
    , @NamedQuery(name = "Employe.findByDateDeNaissance", query = "SELECT e FROM Employe e WHERE e.dateDeNaissance = :dateDeNaissance")
    , @NamedQuery(name = "Employe.findByLieuDeNaissance", query = "SELECT e FROM Employe e WHERE e.lieuDeNaissance = :lieuDeNaissance")
    , @NamedQuery(name = "Employe.findByDateRecrutement", query = "SELECT e FROM Employe e WHERE e.dateRecrutement = :dateRecrutement")
    , @NamedQuery(name = "Employe.findByNationalite", query = "SELECT e FROM Employe e WHERE e.nationalite = :nationalite")
    , @NamedQuery(name = "Employe.findByRetraite", query = "SELECT e FROM Employe e WHERE e.retraite = :retraite")
    , @NamedQuery(name = "Employe.findByGeler", query = "SELECT e FROM Employe e WHERE e.geler = :geler")})
public class Employe implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "numeroCni")
    private String numeroCni;
    @Column(name = "matriculeInterne")
    private String matriculeInterne;
    @Column(name = "matriculeMainDoeuvre")
    private String matriculeMainDoeuvre;
    @Basic(optional = false)
    @Column(name = "prenom")
    private String prenom;
    @Basic(optional = false)
    @Column(name = "nom")
    private String nom;
    @Column(name = "dateDeNaissance")
    @Temporal(TemporalType.DATE)
    private Date dateDeNaissance;
    @Column(name = "lieuDeNaissance")
    private String lieuDeNaissance;
    @Column(name = "dateRecrutement")
    @Temporal(TemporalType.DATE)
    private Date dateRecrutement;
    @Column(name = "nationalite")
    private String nationalite;
    @Basic(optional = false)
    @Column(name = "retraite")
    private boolean retraite;
    @Basic(optional = false)
    @Column(name = "geler")
    private boolean geler;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Absence> absenceList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Document> documentList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Historiquegrade> historiquegradeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Formation> formationList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Membrecaissesociale> membrecaissesocialeList;
    @OneToMany(mappedBy = "employe")
    private List<Utilisateur> utilisateurList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Contact> contactList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Membremutuelle> membremutuelleList;
    @JoinColumn(name = "Genre", referencedColumnName = "id")
    @ManyToOne
    private Genre genre;
    @JoinColumn(name = "SituationMatrimoniale", referencedColumnName = "id")
    @ManyToOne
    private Situationmatrimoniale situationMatrimoniale;
    @JoinColumn(name = "TypeEmploye", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeemploye typeEmploye;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Membresyndicat> membresyndicatList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Conjoint> conjointList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Avoircompetence> avoircompetenceList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Adresse> adresseList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Enfant> enfantList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employe")
    private List<Servir> servirList;

    public Employe() {
    }

    public Employe(Integer id) {
        this.id = id;
    }

    public Employe(Integer id, String prenom, String nom, boolean retraite, boolean geler) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.retraite = retraite;
        this.geler = geler;
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

    public String getMatriculeMainDoeuvre() {
        return matriculeMainDoeuvre;
    }

    public void setMatriculeMainDoeuvre(String matriculeMainDoeuvre) {
        this.matriculeMainDoeuvre = matriculeMainDoeuvre;
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

    public boolean getRetraite() {
        return retraite;
    }

    public void setRetraite(boolean retraite) {
        this.retraite = retraite;
    }

    public boolean getGeler() {
        return geler;
    }

    public void setGeler(boolean geler) {
        this.geler = geler;
    }

    @XmlTransient
    public List<Absence> getAbsenceList() {
        return absenceList;
    }

    public void setAbsenceList(List<Absence> absenceList) {
        this.absenceList = absenceList;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
    }

    @XmlTransient
    public List<Historiquegrade> getHistoriquegradeList() {
        return historiquegradeList;
    }

    public void setHistoriquegradeList(List<Historiquegrade> historiquegradeList) {
        this.historiquegradeList = historiquegradeList;
    }

    @XmlTransient
    public List<Formation> getFormationList() {
        return formationList;
    }

    public void setFormationList(List<Formation> formationList) {
        this.formationList = formationList;
    }

    @XmlTransient
    public List<Membrecaissesociale> getMembrecaissesocialeList() {
        return membrecaissesocialeList;
    }

    public void setMembrecaissesocialeList(List<Membrecaissesociale> membrecaissesocialeList) {
        this.membrecaissesocialeList = membrecaissesocialeList;
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

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
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
    public List<Membresyndicat> getMembresyndicatList() {
        return membresyndicatList;
    }

    public void setMembresyndicatList(List<Membresyndicat> membresyndicatList) {
        this.membresyndicatList = membresyndicatList;
    }

    @XmlTransient
    public List<Conjoint> getConjointList() {
        return conjointList;
    }

    public void setConjointList(List<Conjoint> conjointList) {
        this.conjointList = conjointList;
    }

    @XmlTransient
    public List<Avoircompetence> getAvoircompetenceList() {
        return avoircompetenceList;
    }

    public void setAvoircompetenceList(List<Avoircompetence> avoircompetenceList) {
        this.avoircompetenceList = avoircompetenceList;
    }

    @XmlTransient
    public List<Adresse> getAdresseList() {
        return adresseList;
    }

    public void setAdresseList(List<Adresse> adresseList) {
        this.adresseList = adresseList;
    }

    @XmlTransient
    public List<Enfant> getEnfantList() {
        return enfantList;
    }

    public void setEnfantList(List<Enfant> enfantList) {
        this.enfantList = enfantList;
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
    
}
