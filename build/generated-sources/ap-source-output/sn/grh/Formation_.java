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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:31")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:30")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
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