package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Diplome;
import sn.grh.Document;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:32:34")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:24:56")
>>>>>>> 0c5b02ebd2500a818d7f03aec7a496744b3d7e8e
@StaticMetamodel(Formation.class)
public class Formation_ { 

    public static volatile SingularAttribute<Formation, Date> dateDebut;
    public static volatile ListAttribute<Formation, Document> documentList;
    public static volatile SingularAttribute<Formation, Employe> employe;
    public static volatile SingularAttribute<Formation, String> libelle;
    public static volatile SingularAttribute<Formation, Integer> id;
    public static volatile SingularAttribute<Formation, Date> dateFin;
    public static volatile SingularAttribute<Formation, Diplome> diplome;

}