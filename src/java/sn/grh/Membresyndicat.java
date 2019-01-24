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
 * @author fallougalass
 */
@Entity
@Table(name = "membresyndicat")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Membresyndicat.findAll", query = "SELECT m FROM Membresyndicat m")
    , @NamedQuery(name = "Membresyndicat.findById", query = "SELECT m FROM Membresyndicat m WHERE m.id = :id")
    , @NamedQuery(name = "Membresyndicat.findByDateDebut", query = "SELECT m FROM Membresyndicat m WHERE m.dateDebut = :dateDebut")
    , @NamedQuery(name = "Membresyndicat.findByDateFin", query = "SELECT m FROM Membresyndicat m WHERE m.dateFin = :dateFin")
    , @NamedQuery(name = "Membresyndicat.findByEncours", query = "SELECT m FROM Membresyndicat m WHERE m.encours = :encours")})
public class Membresyndicat implements Serializable {

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
    @Column(name = "dateFin")
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Basic(optional = false)
    @NotNull
    @Column(name = "encours")
    private boolean encours;
    @OneToMany(mappedBy = "membreSyndicat")
    private List<Document> documentList;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;
    @JoinColumn(name = "Syndicat", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Syndicat syndicat;

    public Membresyndicat() {
    }

    public Membresyndicat(Integer id) {
        this.id = id;
    }

    public Membresyndicat(Integer id, Date dateDebut, boolean encours) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.encours = encours;
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

    public Syndicat getSyndicat() {
        return syndicat;
    }

    public void setSyndicat(Syndicat syndicat) {
        this.syndicat = syndicat;
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
        if (!(object instanceof Membresyndicat)) {
            return false;
        }
        Membresyndicat other = (Membresyndicat) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Membresyndicat[ id=" + id + " ]";
    }
    
}
