package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Accesgroupe;
import sn.grh.Utilisateur;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-05-08T10:24:20")
@StaticMetamodel(Groupe.class)
public class Groupe_ { 

    public static volatile SingularAttribute<Groupe, String> code;
    public static volatile SingularAttribute<Groupe, String> libelle;
    public static volatile ListAttribute<Groupe, Accesgroupe> accesgroupeList;
    public static volatile SingularAttribute<Groupe, Integer> id;
    public static volatile ListAttribute<Groupe, Utilisateur> utilisateurList;

}