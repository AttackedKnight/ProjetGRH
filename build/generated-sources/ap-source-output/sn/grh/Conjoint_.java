package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:24:55")
@StaticMetamodel(Conjoint.class)
public class Conjoint_ { 

    public static volatile ListAttribute<Conjoint, Document> documentList;
    public static volatile SingularAttribute<Conjoint, Employe> employe;
    public static volatile SingularAttribute<Conjoint, Integer> id;
    public static volatile SingularAttribute<Conjoint, String> prenom;
    public static volatile SingularAttribute<Conjoint, String> nom;
    public static volatile SingularAttribute<Conjoint, Boolean> estSalarie;

}