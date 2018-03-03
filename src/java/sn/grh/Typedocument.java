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
@Table(name = "typedocument")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Typedocument.findAll", query = "SELECT t FROM Typedocument t")
    , @NamedQuery(name = "Typedocument.findById", query = "SELECT t FROM Typedocument t WHERE t.id = :id")
    , @NamedQuery(name = "Typedocument.findByCode", query = "SELECT t FROM Typedocument t WHERE t.code = :code")
    , @NamedQuery(name = "Typedocument.findByDureeArchivage", query = "SELECT t FROM Typedocument t WHERE t.dureeArchivage = :dureeArchivage")})
public class Typedocument implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "code")
    private String code;
    @Column(name = "dureeArchivage")
    private Integer dureeArchivage;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeDocument")
    private List<Document> documentList;

    public Typedocument() {
    }

    public Typedocument(Integer id) {
        this.id = id;
    }

    public Typedocument(Integer id, String code) {
        this.id = id;
        this.code = code;
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

    public Integer getDureeArchivage() {
        return dureeArchivage;
    }

    public void setDureeArchivage(Integer dureeArchivage) {
        this.dureeArchivage = dureeArchivage;
    }

    @XmlTransient
    public List<Document> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<Document> documentList) {
        this.documentList = documentList;
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
        if (!(object instanceof Typedocument)) {
            return false;
        }
        Typedocument other = (Typedocument) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sn.grh.Typedocument[ id=" + id + " ]";
    }
    
}
