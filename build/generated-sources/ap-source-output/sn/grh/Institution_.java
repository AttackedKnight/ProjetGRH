package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Formation;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-22T22:26:08")
@StaticMetamodel(Institution.class)
public class Institution_ { 

    public static volatile ListAttribute<Institution, Formation> formationList;
    public static volatile SingularAttribute<Institution, String> adresse;
    public static volatile SingularAttribute<Institution, String> telephone;
    public static volatile SingularAttribute<Institution, Integer> id;
    public static volatile SingularAttribute<Institution, String> nom;

}