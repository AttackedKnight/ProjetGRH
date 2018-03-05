package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-03-05T11:57:18")
@StaticMetamodel(Civilite.class)
public class Civilite_ { 

    public static volatile SingularAttribute<Civilite, String> code;
    public static volatile ListAttribute<Civilite, Employe> employeList;
    public static volatile SingularAttribute<Civilite, String> libelle;
    public static volatile SingularAttribute<Civilite, Integer> id;

}