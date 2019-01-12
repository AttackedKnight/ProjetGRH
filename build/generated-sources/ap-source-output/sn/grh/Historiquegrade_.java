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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:07")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
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