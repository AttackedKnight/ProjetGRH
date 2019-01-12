package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Typeabsence;
import sn.grh.Typeautorisation;
import sn.grh.Typepermission;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:17")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:08")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
@StaticMetamodel(Absence.class)
public class Absence_ { 

    public static volatile SingularAttribute<Absence, Integer> etatTraitement;
    public static volatile SingularAttribute<Absence, Employe> employe;
    public static volatile SingularAttribute<Absence, Integer> jourRestant;
    public static volatile SingularAttribute<Absence, Date> dateEnregistrement;
    public static volatile SingularAttribute<Absence, Typeabsence> typeAbsence;
    public static volatile SingularAttribute<Absence, Date> dateDebut;
    public static volatile ListAttribute<Absence, Document> documentList;
    public static volatile SingularAttribute<Absence, Typeautorisation> typeAutorisation;
    public static volatile SingularAttribute<Absence, Integer> duree;
    public static volatile SingularAttribute<Absence, Integer> id;
    public static volatile SingularAttribute<Absence, Date> dateFin;
    public static volatile SingularAttribute<Absence, String> motif;
    public static volatile SingularAttribute<Absence, Typepermission> typePermission;

}