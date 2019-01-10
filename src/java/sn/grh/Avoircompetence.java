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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "avoircompetence")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Avoircompetence.findAll", query = "SELECT a FROM Avoircompetence a")
    , @NamedQuery(name = "Avoircompetence.findByDescription", query = "SELECT a FROM Avoircompetence a WHERE a.description = :description")
    , @NamedQuery(name = "Avoircompetence.findById", query = "SELECT a FROM Avoircompetence a WHERE a.id = :id")})
public class Avoircompetence implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "description")
    private String description;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @OneToMany(mappedBy = "avoirCompetence")
    private List<Document> documentList;
    @JoinColumn(name = "Competence", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Domaine competence;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;

    public Avoircompetence() {
    }

    public Avoircompetence(Integer id) {
        this.id = id;
    }

    public Avoircompetence(Integer id, String description) {
        this.id = id;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
    }

    public Domaine getCompetence() {
        return competence;
    }

    public void setCompetence(Domaine competence) {
        this.competence = competence;
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
        if (!(object instanceof Avoircompetence)) {
            return false;
        }
        Avoircompetence other = (Avoircompetence) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Avoircompetence[ id=" + id + " ]";
    }
    
}
