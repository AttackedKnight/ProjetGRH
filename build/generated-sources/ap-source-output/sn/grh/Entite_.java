package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Entite;
import sn.grh.Servir;
import sn.grh.Typeentite;
import sn.grh.Utilisateur;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:09")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
@StaticMetamodel(Entite.class)
public class Entite_ { 

    public static volatile ListAttribute<Entite, Entite> entiteList;
    public static volatile SingularAttribute<Entite, Entite> entite;
    public static volatile SingularAttribute<Entite, Typeentite> typeEntite;
    public static volatile ListAttribute<Entite, Servir> servirList;
    public static volatile SingularAttribute<Entite, String> adresse;
    public static volatile SingularAttribute<Entite, String> telephone;
    public static volatile SingularAttribute<Entite, Integer> id;
    public static volatile SingularAttribute<Entite, String> nom;
    public static volatile SingularAttribute<Entite, String> email;
    public static volatile ListAttribute<Entite, Utilisateur> utilisateurList;

}