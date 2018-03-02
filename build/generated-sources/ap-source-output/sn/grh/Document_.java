package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Typedocument;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-02-28T15:49:43")
@StaticMetamodel(Document.class)
public class Document_ { 

    public static volatile SingularAttribute<Document, String> emplacement;
    public static volatile SingularAttribute<Document, Date> dateSignature;
    public static volatile SingularAttribute<Document, Employe> employe;
    public static volatile SingularAttribute<Document, String> description;
    public static volatile SingularAttribute<Document, Typedocument> typeDocument;
    public static volatile SingularAttribute<Document, Integer> id;
    public static volatile SingularAttribute<Document, Date> dateEnregistrement;
    public static volatile SingularAttribute<Document, Date> echeance;

}