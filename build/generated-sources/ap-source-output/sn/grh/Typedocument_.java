package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-03-07T12:46:14")
@StaticMetamodel(Typedocument.class)
public class Typedocument_ { 

    public static volatile SingularAttribute<Typedocument, Integer> dureeArchivage;
    public static volatile SingularAttribute<Typedocument, String> code;
    public static volatile ListAttribute<Typedocument, Document> documentList;
    public static volatile SingularAttribute<Typedocument, Integer> id;

}