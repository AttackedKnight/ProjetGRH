package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Categorie;
import sn.grh.Classe;
import sn.grh.Corps;
import sn.grh.Echelon;
import sn.grh.Employe;
import sn.grh.Niveau;
import sn.grh.Typeavancement;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-04-23T12:48:08")
@StaticMetamodel(Grade.class)
public class Grade_ { 

    public static volatile SingularAttribute<Grade, Boolean> encours;
    public static volatile SingularAttribute<Grade, Date> dateDePassage;
    public static volatile SingularAttribute<Grade, Classe> classe;
    public static volatile SingularAttribute<Grade, Categorie> categorie;
    public static volatile SingularAttribute<Grade, Employe> employe;
    public static volatile SingularAttribute<Grade, Integer> id;
    public static volatile SingularAttribute<Grade, Niveau> niveau;
    public static volatile SingularAttribute<Grade, Corps> corps;
    public static volatile SingularAttribute<Grade, Echelon> echelon;
    public static volatile SingularAttribute<Grade, Typeavancement> typeAvancement;

}