package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Avoircompetence;
import sn.grh.Employe;
import sn.grh.Formation;
import sn.grh.Typedocument;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:29")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:29")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Document.class)
public class Document_ { 

    public static volatile SingularAttribute<Document, String> emplacement;
    public static volatile SingularAttribute<Document, Avoircompetence> avoirCompetence;
    public static volatile SingularAttribute<Document, Date> dateSignature;
    public static volatile SingularAttribute<Document, Boolean> situationMatrimoniale;
    public static volatile SingularAttribute<Document, Employe> employe;
    public static volatile SingularAttribute<Document, Absence> absence;
    public static volatile SingularAttribute<Document, String> description;
    public static volatile SingularAttribute<Document, Typedocument> typeDocument;
    public static volatile SingularAttribute<Document, Formation> formation;
    public static volatile SingularAttribute<Document, Integer> id;
    public static volatile SingularAttribute<Document, Date> dateEnregistrement;
    public static volatile SingularAttribute<Document, Date> echeance;

}