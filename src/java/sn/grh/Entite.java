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
 * @author fallougalass
 */
@Entity
@Table(name = "entite")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Entite.findAll", query = "SELECT e FROM Entite e")
    , @NamedQuery(name = "Entite.findById", query = "SELECT e FROM Entite e WHERE e.id = :id")
    , @NamedQuery(name = "Entite.findByNom", query = "SELECT e FROM Entite e WHERE e.nom = :nom")
    , @NamedQuery(name = "Entite.findByAdresse", query = "SELECT e FROM Entite e WHERE e.adresse = :adresse")
    , @NamedQuery(name = "Entite.findByTelephone", query = "SELECT e FROM Entite e WHERE e.telephone = :telephone")
    , @NamedQuery(name = "Entite.findByEmail", query = "SELECT e FROM Entite e WHERE e.email = :email")})
public class Entite implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "nom")
    private String nom;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "adresse")
    private String adresse;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "telephone")
    private String telephone;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "email")
    private String email;
    @OneToMany(mappedBy = "entite")
    private List<Entite> entiteList;
    @JoinColumn(name = "Entite", referencedColumnName = "id")
    @ManyToOne
    private Entite entite;
    @JoinColumn(name = "TypeEntite", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Typeentite typeEntite;
    @OneToMany(mappedBy = "entite")
    private List<Utilisateur> utilisateurList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "entite")
    private List<Servir> servirList;

    public Entite() {
    }

    public Entite(Integer id) {
        this.id = id;
    }

    public Entite(Integer id, String nom, String adresse, String telephone, String email) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @XmlTransient
    public List<Entite> getEntiteList() {
        return entiteList;
    }

    public void setEntiteList(List<Entite> entiteList) {
        this.entiteList = entiteList;
    }

    public Entite getEntite() {
        return entite;
    }

    public void setEntite(Entite entite) {
        this.entite = entite;
    }

    public Typeentite getTypeEntite() {
        return typeEntite;
    }

    public void setTypeEntite(Typeentite typeEntite) {
        this.typeEntite = typeEntite;
    }

    @XmlTransient
    public List<Utilisateur> getUtilisateurList() {
        return utilisateurList;
    }

    public void setUtilisateurList(List<Utilisateur> utilisateurList) {
        this.utilisateurList = utilisateurList;
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
        if (!(object instanceof Entite)) {
            return false;
        }
        Entite other = (Entite) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Entite[ id=" + id + " ]";
    }
    
}
