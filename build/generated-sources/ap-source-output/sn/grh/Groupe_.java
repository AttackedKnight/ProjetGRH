package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Accesgroupe;
import sn.grh.Groupetypeemploye;
import sn.grh.Utilisateur;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T15:22:14")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T12:25:19")
>>>>>>> 62cdb53c7f0e59cfec7a9d342c957cf83cffbdfe
@StaticMetamodel(Groupe.class)
public class Groupe_ { 

    public static volatile SingularAttribute<Groupe, String> code;
    public static volatile ListAttribute<Groupe, Groupetypeemploye> groupetypeemployeList;
    public static volatile SingularAttribute<Groupe, String> libelle;
    public static volatile ListAttribute<Groupe, Accesgroupe> accesgroupeList;
    public static volatile SingularAttribute<Groupe, Integer> id;
    public static volatile ListAttribute<Groupe, Utilisateur> utilisateurList;

}