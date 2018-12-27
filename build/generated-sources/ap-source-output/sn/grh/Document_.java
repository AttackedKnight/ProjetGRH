package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Avoircompetence;
import sn.grh.Conjoint;
import sn.grh.Employe;
import sn.grh.Enfant;
import sn.grh.Formation;
import sn.grh.Historiquegrade;
import sn.grh.Membremutuelle;
import sn.grh.Servir;
import sn.grh.Typedocument;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:32:34")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:24:54")
>>>>>>> 0c5b02ebd2500a818d7f03aec7a496744b3d7e8e
@StaticMetamodel(Document.class)
public class Document_ { 

    public static volatile SingularAttribute<Document, String> emplacement;
    public static volatile SingularAttribute<Document, Avoircompetence> avoirCompetence;
    public static volatile SingularAttribute<Document, Historiquegrade> historiqueGrade;
    public static volatile SingularAttribute<Document, Date> dateSignature;
    public static volatile SingularAttribute<Document, Boolean> situationMatrimoniale;
    public static volatile SingularAttribute<Document, Membremutuelle> membreMutuelle;
    public static volatile SingularAttribute<Document, Employe> employe;
    public static volatile SingularAttribute<Document, Absence> absence;
    public static volatile SingularAttribute<Document, String> description;
    public static volatile SingularAttribute<Document, Boolean> syndicat;
    public static volatile SingularAttribute<Document, Formation> formation;
    public static volatile SingularAttribute<Document, Date> dateEnregistrement;
    public static volatile SingularAttribute<Document, Conjoint> conjoint;
    public static volatile SingularAttribute<Document, Typedocument> typeDocument;
    public static volatile SingularAttribute<Document, Integer> id;
    public static volatile SingularAttribute<Document, Enfant> enfant;
    public static volatile SingularAttribute<Document, Servir> servir;
    public static volatile SingularAttribute<Document, Date> echeance;

}