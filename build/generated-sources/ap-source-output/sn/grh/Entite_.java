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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:32:34")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:24:55")
>>>>>>> 0c5b02ebd2500a818d7f03aec7a496744b3d7e8e
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