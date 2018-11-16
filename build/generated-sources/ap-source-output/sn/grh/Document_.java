package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Avoircompetence;
import sn.grh.Conge;
import sn.grh.Employe;
import sn.grh.Formation;
import sn.grh.Typedocument;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-14T13:13:09")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-07T09:33:47")
>>>>>>> 914210634b157a047aaedfb519063e5ac491cf8c
@StaticMetamodel(Document.class)
public class Document_ { 

    public static volatile SingularAttribute<Document, String> emplacement;
    public static volatile SingularAttribute<Document, Avoircompetence> avoirCompetence;
    public static volatile SingularAttribute<Document, Date> dateSignature;
    public static volatile SingularAttribute<Document, Boolean> situationMatrimoniale;
    public static volatile SingularAttribute<Document, Employe> employe;
    public static volatile SingularAttribute<Document, Absence> absence;
    public static volatile SingularAttribute<Document, Conge> conge;
    public static volatile SingularAttribute<Document, String> description;
    public static volatile SingularAttribute<Document, Formation> formation;
    public static volatile SingularAttribute<Document, Date> dateEnregistrement;
    public static volatile SingularAttribute<Document, Typedocument> typeDocument;
    public static volatile SingularAttribute<Document, Integer> id;
    public static volatile SingularAttribute<Document, Date> echeance;

}