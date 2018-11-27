package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Accesgroupe;
import sn.grh.Groupetypeemploye;
import sn.grh.Utilisateur;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:28")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:29")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Groupe.class)
public class Groupe_ { 

    public static volatile SingularAttribute<Groupe, String> code;
    public static volatile ListAttribute<Groupe, Groupetypeemploye> groupetypeemployeList;
    public static volatile SingularAttribute<Groupe, String> libelle;
    public static volatile ListAttribute<Groupe, Accesgroupe> accesgroupeList;
    public static volatile SingularAttribute<Groupe, Integer> id;
    public static volatile ListAttribute<Groupe, Utilisateur> utilisateurList;

}