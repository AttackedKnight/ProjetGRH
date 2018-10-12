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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T18:18:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T13:52:10")
>>>>>>> e3daec2c89da717fb7b6f858590a0117e8aee26b
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