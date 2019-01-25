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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:41")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
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