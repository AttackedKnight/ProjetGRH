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
@Table(name = "membrecaissesociale")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Membrecaissesociale.findAll", query = "SELECT m FROM Membrecaissesociale m")
    , @NamedQuery(name = "Membrecaissesociale.findById", query = "SELECT m FROM Membrecaissesociale m WHERE m.id = :id")
    , @NamedQuery(name = "Membrecaissesociale.findByMatriculeCaisseSociale", query = "SELECT m FROM Membrecaissesociale m WHERE m.matriculeCaisseSociale = :matriculeCaisseSociale")
    , @NamedQuery(name = "Membrecaissesociale.findByPoucentage", query = "SELECT m FROM Membrecaissesociale m WHERE m.poucentage = :poucentage")
    , @NamedQuery(name = "Membrecaissesociale.findByDateDebut", query = "SELECT m FROM Membrecaissesociale m WHERE m.dateDebut = :dateDebut")
    , @NamedQuery(name = "Membrecaissesociale.findByDateFin", query = "SELECT m FROM Membrecaissesociale m WHERE m.dateFin = :dateFin")
    , @NamedQuery(name = "Membrecaissesociale.findByEncours", query = "SELECT m FROM Membrecaissesociale m WHERE m.encours = :encours")})
public class Membrecaissesociale implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "matriculeCaisseSociale")
    private String matriculeCaisseSociale;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "poucentage")
    private Float poucentage;
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
    @OneToMany(mappedBy = "membreCaisseSociale")
    private List<Document> documentList;
    @JoinColumn(name = "CaisseSociale", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Caissesociale caisseSociale;
    @JoinColumn(name = "Employe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Employe employe;

    public Membrecaissesociale() {
    }

    public Membrecaissesociale(Integer id) {
        this.id = id;
    }

    public Membrecaissesociale(Integer id, String matriculeCaisseSociale, Date dateDebut, boolean encours) {
        this.id = id;
        this.matriculeCaisseSociale = matriculeCaisseSociale;
        this.dateDebut = dateDebut;
        this.encours = encours;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMatriculeCaisseSociale() {
        return matriculeCaisseSociale;
    }

    public void setMatriculeCaisseSociale(String matriculeCaisseSociale) {
        this.matriculeCaisseSociale = matriculeCaisseSociale;
    }

    public Float getPoucentage() {
        return poucentage;
    }

    public void setPoucentage(Float poucentage) {
        this.poucentage = poucentage;
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

    public Caissesociale getCaisseSociale() {
        return caisseSociale;
    }

    public void setCaisseSociale(Caissesociale caisseSociale) {
        this.caisseSociale = caisseSociale;
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
        if (!(object instanceof Membrecaissesociale)) {
            return false;
        }
        Membrecaissesociale other = (Membrecaissesociale) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Membrecaissesociale[ id=" + id + " ]";
    }
    
}
