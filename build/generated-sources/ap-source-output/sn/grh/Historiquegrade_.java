package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Grade;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:30")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:30")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Historiquegrade.class)
public class Historiquegrade_ { 

    public static volatile SingularAttribute<Historiquegrade, Boolean> encours;
    public static volatile SingularAttribute<Historiquegrade, Date> datePassation;
    public static volatile SingularAttribute<Historiquegrade, Date> dateProchainAvancement;
    public static volatile SingularAttribute<Historiquegrade, Employe> employe;
    public static volatile SingularAttribute<Historiquegrade, Grade> grade;
    public static volatile SingularAttribute<Historiquegrade, Integer> id;

}