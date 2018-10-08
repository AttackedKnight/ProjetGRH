package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Typeautorisation;
import sn.grh.Typepermission;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-08T15:56:59")
@StaticMetamodel(Absence.class)
public class Absence_ { 

    public static volatile SingularAttribute<Absence, Integer> etatTraitement;
    public static volatile SingularAttribute<Absence, Typepermission> typeAbsence;
    public static volatile SingularAttribute<Absence, Date> dateDebut;
    public static volatile SingularAttribute<Absence, Employe> employe;
    public static volatile ListAttribute<Absence, Document> documentList;
    public static volatile SingularAttribute<Absence, Typeautorisation> typeAutorisation;
    public static volatile SingularAttribute<Absence, Integer> duree;
    public static volatile SingularAttribute<Absence, Integer> id;
    public static volatile SingularAttribute<Absence, Date> dateFin;
    public static volatile SingularAttribute<Absence, String> motif;
    public static volatile SingularAttribute<Absence, Date> dateEnregistrement;

}