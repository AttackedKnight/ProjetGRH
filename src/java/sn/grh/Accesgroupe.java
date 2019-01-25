/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grh;

import java.io.Serializable;
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
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author hp
 */
@Entity
@Table(name = "accesgroupe")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Accesgroupe.findAll", query = "SELECT a FROM Accesgroupe a")
    , @NamedQuery(name = "Accesgroupe.findById", query = "SELECT a FROM Accesgroupe a WHERE a.id = :id")
    , @NamedQuery(name = "Accesgroupe.findByNomTable", query = "SELECT a FROM Accesgroupe a WHERE a.nomTable = :nomTable")
    , @NamedQuery(name = "Accesgroupe.findByAjouter", query = "SELECT a FROM Accesgroupe a WHERE a.ajouter = :ajouter")
    , @NamedQuery(name = "Accesgroupe.findByModifier", query = "SELECT a FROM Accesgroupe a WHERE a.modifier = :modifier")
    , @NamedQuery(name = "Accesgroupe.findBySupprimer", query = "SELECT a FROM Accesgroupe a WHERE a.supprimer = :supprimer")
    , @NamedQuery(name = "Accesgroupe.findByConsulter", query = "SELECT a FROM Accesgroupe a WHERE a.consulter = :consulter")
    , @NamedQuery(name = "Accesgroupe.findByLister", query = "SELECT a FROM Accesgroupe a WHERE a.lister = :lister")})
public class Accesgroupe implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "nomTable")
    private String nomTable;
    @Basic(optional = false)
    @Column(name = "ajouter")
    private boolean ajouter;
    @Basic(optional = false)
    @Column(name = "modifier")
    private boolean modifier;
    @Basic(optional = false)
    @Column(name = "supprimer")
    private boolean supprimer;
    @Basic(optional = false)
    @Column(name = "consulter")
    private boolean consulter;
    @Basic(optional = false)
    @Column(name = "lister")
    private boolean lister;
    @JoinColumn(name = "Groupe", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Groupe groupe;

    public Accesgroupe() {
    }

    public Accesgroupe(Integer id) {
        this.id = id;
    }

    public Accesgroupe(Integer id, String nomTable, boolean ajouter, boolean modifier, boolean supprimer, boolean consulter, boolean lister) {
        this.id = id;
        this.nomTable = nomTable;
        this.ajouter = ajouter;
        this.modifier = modifier;
        this.supprimer = supprimer;
        this.consulter = consulter;
        this.lister = lister;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomTable() {
        return nomTable;
    }

    public void setNomTable(String nomTable) {
        this.nomTable = nomTable;
    }

    public boolean getAjouter() {
        return ajouter;
    }

    public void setAjouter(boolean ajouter) {
        this.ajouter = ajouter;
    }

    public boolean getModifier() {
        return modifier;
    }

    public void setModifier(boolean modifier) {
        this.modifier = modifier;
    }

    public boolean getSupprimer() {
        return supprimer;
    }

    public void setSupprimer(boolean supprimer) {
        this.supprimer = supprimer;
    }

    public boolean getConsulter() {
        return consulter;
    }

    public void setConsulter(boolean consulter) {
        this.consulter = consulter;
    }

    public boolean getLister() {
        return lister;
    }

    public void setLister(boolean lister) {
        this.lister = lister;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
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
        if (!(object instanceof Accesgroupe)) {
            return false;
        }
        Accesgroupe other = (Accesgroupe) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Accesgroupe[ id=" + id + " ]";
    }
    
}
