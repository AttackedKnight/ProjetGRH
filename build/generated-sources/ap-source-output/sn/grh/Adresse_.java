package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
@StaticMetamodel(Adresse.class)
public class Adresse_ { 

    public static volatile SingularAttribute<Adresse, String> ville;
    public static volatile SingularAttribute<Adresse, Employe> employe;
    public static volatile SingularAttribute<Adresse, String> quartier;
    public static volatile SingularAttribute<Adresse, Integer> id;

}