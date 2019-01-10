/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "typeemploye")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Typeemploye.findAll", query = "SELECT t FROM Typeemploye t")
    , @NamedQuery(name = "Typeemploye.findById", query = "SELECT t FROM Typeemploye t WHERE t.id = :id")
    , @NamedQuery(name = "Typeemploye.findByCode", query = "SELECT t FROM Typeemploye t WHERE t.code = :code")
    , @NamedQuery(name = "Typeemploye.findByLibelle", query = "SELECT t FROM Typeemploye t WHERE t.libelle = :libelle")})
public class Typeemploye implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "libelle")
    private String libelle;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Absencetypeemploye> absencetypeemployeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Groupetypeemploye> groupetypeemployeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Gradetypeemploye> gradetypeemployeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Employe> employeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Mutuellesantetypeemploye> mutuellesantetypeemployeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Caissesocialetypeemploye> caissesocialetypeemployeList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeEmploye")
    private List<Syndicattypeemploye> syndicattypeemployeList;

    public Typeemploye() {
    }

    public Typeemploye(Integer id) {
        this.id = id;
    }

    public Typeemploye(Integer id, String code, String libelle) {
        this.id = id;
        this.code = code;
        this.libelle = libelle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @XmlTransient
    public List<Absencetypeemploye> getAbsencetypeemployeList() {
        return absencetypeemployeList;
    }

    public void setAbsencetypeemployeList(List<Absencetypeemploye> absencetypeemployeList) {
        this.absencetypeemployeList = absencetypeemployeList;
    }

    @XmlTransient
    public List<Groupetypeemploye> getGroupetypeemployeList() {
        return groupetypeemployeList;
    }

    public void setGroupetypeemployeList(List<Groupetypeemploye> groupetypeemployeList) {
        this.groupetypeemployeList = groupetypeemployeList;
    }

    @XmlTransient
    public List<Gradetypeemploye> getGradetypeemployeList() {
        return gradetypeemployeList;
    }

    public void setGradetypeemployeList(List<Gradetypeemploye> gradetypeemployeList) {
        this.gradetypeemployeList = gradetypeemployeList;
    }

    @XmlTransient
    public List<Employe> getEmployeList() {
        return employeList;
    }

    public void setEmployeList(List<Employe> employeList) {
        this.employeList = employeList;
    }

    @XmlTransient
    public List<Mutuellesantetypeemploye> getMutuellesantetypeemployeList() {
        return mutuellesantetypeemployeList;
    }

    public void setMutuellesantetypeemployeList(List<Mutuellesantetypeemploye> mutuellesantetypeemployeList) {
        this.mutuellesantetypeemployeList = mutuellesantetypeemployeList;
    }

    @XmlTransient
    public List<Caissesocialetypeemploye> getCaissesocialetypeemployeList() {
        return caissesocialetypeemployeList;
    }

    public void setCaissesocialetypeemployeList(List<Caissesocialetypeemploye> caissesocialetypeemployeList) {
        this.caissesocialetypeemployeList = caissesocialetypeemployeList;
    }

    @XmlTransient
    public List<Syndicattypeemploye> getSyndicattypeemployeList() {
        return syndicattypeemployeList;
    }

    public void setSyndicattypeemployeList(List<Syndicattypeemploye> syndicattypeemployeList) {
        this.syndicattypeemployeList = syndicattypeemployeList;
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
        if (!(object instanceof Typeemploye)) {
            return false;
        }
        Typeemploye other = (Typeemploye) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Typeemploye[ id=" + id + " ]";
    }
    
}
