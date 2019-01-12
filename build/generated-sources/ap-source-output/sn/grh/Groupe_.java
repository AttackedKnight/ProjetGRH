package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Accesgroupe;
import sn.grh.Groupetypeemploye;
import sn.grh.Utilisateur;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:51")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:17")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:08")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
@StaticMetamodel(Groupe.class)
public class Groupe_ { 

    public static volatile SingularAttribute<Groupe, String> code;
    public static volatile ListAttribute<Groupe, Groupetypeemploye> groupetypeemployeList;
    public static volatile SingularAttribute<Groupe, String> libelle;
    public static volatile ListAttribute<Groupe, Accesgroupe> accesgroupeList;
    public static volatile SingularAttribute<Groupe, Integer> id;
    public static volatile ListAttribute<Groupe, Utilisateur> utilisateurList;

}