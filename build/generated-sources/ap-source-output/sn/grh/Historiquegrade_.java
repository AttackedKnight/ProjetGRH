package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Grade;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-05-30T12:57:13")
@StaticMetamodel(Historiquegrade.class)
public class Historiquegrade_ { 

    public static volatile SingularAttribute<Historiquegrade, Boolean> encours;
    public static volatile SingularAttribute<Historiquegrade, Date> datePassation;
    public static volatile SingularAttribute<Historiquegrade, Date> dateProchainAvancement;
    public static volatile SingularAttribute<Historiquegrade, Employe> employe;
    public static volatile SingularAttribute<Historiquegrade, Grade> grade;
    public static volatile SingularAttribute<Historiquegrade, Integer> id;

}