package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Absencetypeemploye;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T15:22:15")
@StaticMetamodel(Typeabsence.class)
public class Typeabsence_ { 

    public static volatile ListAttribute<Typeabsence, Absence> absenceList;
    public static volatile ListAttribute<Typeabsence, Absencetypeemploye> absencetypeemployeList;
    public static volatile SingularAttribute<Typeabsence, String> code;
    public static volatile SingularAttribute<Typeabsence, String> libelle;
    public static volatile SingularAttribute<Typeabsence, Integer> id;

}