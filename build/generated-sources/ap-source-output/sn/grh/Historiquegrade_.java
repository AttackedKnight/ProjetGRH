package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Grade;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T15:22:14")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T12:25:18")
>>>>>>> 62cdb53c7f0e59cfec7a9d342c957cf83cffbdfe
@StaticMetamodel(Historiquegrade.class)
public class Historiquegrade_ { 

    public static volatile SingularAttribute<Historiquegrade, Boolean> encours;
    public static volatile SingularAttribute<Historiquegrade, Date> datePassation;
    public static volatile SingularAttribute<Historiquegrade, Date> dateProchainAvancement;
    public static volatile ListAttribute<Historiquegrade, Document> documentList;
    public static volatile SingularAttribute<Historiquegrade, Employe> employe;
    public static volatile SingularAttribute<Historiquegrade, Grade> grade;
    public static volatile SingularAttribute<Historiquegrade, Integer> id;

}