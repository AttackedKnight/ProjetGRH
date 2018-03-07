package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Entite;
import sn.grh.Groupe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-03-07T12:46:14")
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