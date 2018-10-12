package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T18:18:41")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T13:52:09")
>>>>>>> e3daec2c89da717fb7b6f858590a0117e8aee26b
@StaticMetamodel(Conge.class)
public class Conge_ { 

    public static volatile SingularAttribute<Conge, Integer> etatTraitement;
    public static volatile SingularAttribute<Conge, Date> dateDebut;
    public static volatile SingularAttribute<Conge, Employe> employe;
    public static volatile ListAttribute<Conge, Document> documentList;
    public static volatile SingularAttribute<Conge, Integer> duree;
    public static volatile SingularAttribute<Conge, Integer> id;
    public static volatile SingularAttribute<Conge, Date> dateFin;
    public static volatile SingularAttribute<Conge, Date> dateEnregistrement;

}