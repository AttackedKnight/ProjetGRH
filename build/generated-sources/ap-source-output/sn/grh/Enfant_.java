package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T15:22:14")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T12:25:19")
>>>>>>> 62cdb53c7f0e59cfec7a9d342c957cf83cffbdfe
@StaticMetamodel(Enfant.class)
public class Enfant_ { 

    public static volatile SingularAttribute<Enfant, Date> dateNaissance;
    public static volatile ListAttribute<Enfant, Document> documentList;
    public static volatile SingularAttribute<Enfant, Employe> employe;
    public static volatile SingularAttribute<Enfant, Integer> id;
    public static volatile SingularAttribute<Enfant, String> prenom;
    public static volatile SingularAttribute<Enfant, String> nom;

}