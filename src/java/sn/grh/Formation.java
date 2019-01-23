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
 * @author hp
 */
@Entity
@Table(name = "formation")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Formation.findAll", query = "SELECT f FROM Formation f")
    , @NamedQuery(name = "Formation.findById", query = "SELECT f FROM Formation f WHERE f.id = :id")
    , @NamedQuery(name = "Formation.findByLibelle", query = "SELECT f FROM Formation f WHERE f.libelle = :libelle")
    , @NamedQuery(name = "Formation.findByDateDebut", query = "SELECT f FROM Formation f WHERE f.dateDebut = :dateDebut")
    , @NamedQuery(name = "Formation.findByDateFin", query = "SELECT f FROM Formation f WHERE f.dateFin = :dateFin")
    , @NamedQuery(name = "Formation.findByDiplome", query = "SELECT f FROM Formation f WHERE f.diplome = :diplome")
    , @NamedQuery(name = "Formation.findByBourse", query = "SELECT f FROM Formation f WHERE f.bourse = :bourse")
    , @NamedQuery(name = "Formation.findByMontantBourse", query = "SELECT f FROM Formation f WHERE f.montantBourse = :montantBourse")})
public class Formation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "libelle")
    private String libelle;
    @Column(name = "dateDebut")
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Column(name = "dateFin")
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Size(max = 255)
    @Column(name = "diplome")
    private String diplome;
    @Basic(optional = false)
    @NotNull
    @Column(name = "bourse")
    private boolean bourse;
    @Column(name = "montantBourse")
    private Long montantBourse;
    @OneToMany(mappedBy = "formation")
    private List<Document> documentList;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Institution", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Institution institution;

    public Formation() {
    }

    public Formation(Integer id) {
        this.id = id;
    }

    public Formation(Integer id, String libelle, boolean bourse) {
        this.id = id;
        this.libelle = libelle;
        this.bourse = bourse;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
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

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public boolean getBourse() {
        return bourse;
    }

    public void setBourse(boolean bourse) {
        this.bourse = bourse;
    }

    public Long getMontantBourse() {
        return montantBourse;
    }

    public void setMontantBourse(Long montantBourse) {
        this.montantBourse = montantBourse;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
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
        if (!(object instanceof Formation)) {
            return false;
        }
        Formation other = (Formation) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Formation[ id=" + id + " ]";
    }
    
}
