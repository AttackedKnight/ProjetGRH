package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:30")
@StaticMetamodel(Typepermission.class)
public class Typepermission_ { 

    public static volatile SingularAttribute<Typepermission, Integer> nombreDeJour;
    public static volatile ListAttribute<Typepermission, Absence> absenceList;
    public static volatile SingularAttribute<Typepermission, String> libelle;
    public static volatile SingularAttribute<Typepermission, Integer> id;

}