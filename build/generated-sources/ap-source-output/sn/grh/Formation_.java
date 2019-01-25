package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Institution;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T11:51:16")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:41")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
>>>>>>> ddba5288e695677d076de01e62bb52b19b3f4e84
@StaticMetamodel(Formation.class)
public class Formation_ { 

    public static volatile SingularAttribute<Formation, Institution> institution;
    public static volatile SingularAttribute<Formation, Boolean> bourse;
    public static volatile SingularAttribute<Formation, Date> dateDebut;
    public static volatile ListAttribute<Formation, Document> documentList;
    public static volatile SingularAttribute<Formation, Employe> employe;
    public static volatile SingularAttribute<Formation, String> libelle;
    public static volatile SingularAttribute<Formation, Long> montantBourse;
    public static volatile SingularAttribute<Formation, Integer> id;
    public static volatile SingularAttribute<Formation, Date> dateFin;
    public static volatile SingularAttribute<Formation, String> diplome;

}