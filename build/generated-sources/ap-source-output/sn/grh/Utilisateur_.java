package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Entite;
import sn.grh.Groupe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:30")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:30")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Utilisateur.class)
public class Utilisateur_ { 

    public static volatile SingularAttribute<Utilisateur, String> motDePasse;
    public static volatile SingularAttribute<Utilisateur, Entite> entite;
    public static volatile SingularAttribute<Utilisateur, Employe> employe;
    public static volatile SingularAttribute<Utilisateur, Integer> id;
    public static volatile SingularAttribute<Utilisateur, String> avatar;
    public static volatile SingularAttribute<Utilisateur, Groupe> groupe;
    public static volatile SingularAttribute<Utilisateur, String> login;
    public static volatile SingularAttribute<Utilisateur, String> email;

}