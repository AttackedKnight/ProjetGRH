/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "conjoint")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Conjoint.findAll", query = "SELECT c FROM Conjoint c")
    , @NamedQuery(name = "Conjoint.findById", query = "SELECT c FROM Conjoint c WHERE c.id = :id")
    , @NamedQuery(name = "Conjoint.findByPrenom", query = "SELECT c FROM Conjoint c WHERE c.prenom = :prenom")
    , @NamedQuery(name = "Conjoint.findByNom", query = "SELECT c FROM Conjoint c WHERE c.nom = :nom")
    , @NamedQuery(name = "Conjoint.findByEstSalarie", query = "SELECT c FROM Conjoint c WHERE c.estSalarie = :estSalarie")})
public class Conjoint implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "prenom")
    private String prenom;
    @Column(name = "nom")
    private String nom;
    @Basic(optional = false)
    @Column(name = "estSalarie")
    private boolean estSalarie;
    @OneToMany(mappedBy = "conjoint")
    private List<Document> documentList;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;

    public Conjoint() {
    }

    public Conjoint(Integer id) {
        this.id = id;
    }

    public Conjoint(Integer id, boolean estSalarie) {
        this.id = id;
        this.estSalarie = estSalarie;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public boolean getEstSalarie() {
        return estSalarie;
    }

    public void setEstSalarie(boolean estSalarie) {
        this.estSalarie = estSalarie;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Conjoint)) {
            return false;
        }
        Conjoint other = (Conjoint) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Conjoint[ id=" + id + " ]";
    }
    
}
