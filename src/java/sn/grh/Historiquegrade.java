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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "historiquegrade")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Historiquegrade.findAll", query = "SELECT h FROM Historiquegrade h")
    , @NamedQuery(name = "Historiquegrade.findById", query = "SELECT h FROM Historiquegrade h WHERE h.id = :id")
    , @NamedQuery(name = "Historiquegrade.findByDatePassation", query = "SELECT h FROM Historiquegrade h WHERE h.datePassation = :datePassation")
    , @NamedQuery(name = "Historiquegrade.findByDateProchainAvancement", query = "SELECT h FROM Historiquegrade h WHERE h.dateProchainAvancement = :dateProchainAvancement")
    , @NamedQuery(name = "Historiquegrade.findByEncours", query = "SELECT h FROM Historiquegrade h WHERE h.encours = :encours")})
public class Historiquegrade implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "datePassation")
    @Temporal(TemporalType.DATE)
    private Date datePassation;
    @Basic(optional = false)
    @NotNull
    @Column(name = "dateProchainAvancement")
    @Temporal(TemporalType.DATE)
    private Date dateProchainAvancement;
    @Basic(optional = false)
    @NotNull
    @Column(name = "encours")
    private boolean encours;
    @OneToMany(mappedBy = "historiqueGrade")
    private List<Document> documentList;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Grade", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Grade grade;

    public Historiquegrade() {
    }

    public Historiquegrade(Integer id) {
        this.id = id;
    }

    public Historiquegrade(Integer id, Date datePassation, Date dateProchainAvancement, boolean encours) {
        this.id = id;
        this.datePassation = datePassation;
        this.dateProchainAvancement = dateProchainAvancement;
        this.encours = encours;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDatePassation() {
        return datePassation;
    }

    public void setDatePassation(Date datePassation) {
        this.datePassation = datePassation;
    }

    public Date getDateProchainAvancement() {
        return dateProchainAvancement;
    }

    public void setDateProchainAvancement(Date dateProchainAvancement) {
        this.dateProchainAvancement = dateProchainAvancement;
    }

    public boolean getEncours() {
        return encours;
    }

    public void setEncours(boolean encours) {
        this.encours = encours;
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

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
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
        if (!(object instanceof Historiquegrade)) {
            return false;
        }
        Historiquegrade other = (Historiquegrade) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Historiquegrade[ id=" + id + " ]";
    }
    
}
