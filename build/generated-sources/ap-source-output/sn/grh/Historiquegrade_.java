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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T11:51:15")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:42")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
>>>>>>> ddba5288e695677d076de01e62bb52b19b3f4e84
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