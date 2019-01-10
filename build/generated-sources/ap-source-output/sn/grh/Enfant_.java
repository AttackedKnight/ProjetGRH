package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:09")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
@StaticMetamodel(Enfant.class)
public class Enfant_ { 

    public static volatile SingularAttribute<Enfant, Date> dateNaissance;
    public static volatile ListAttribute<Enfant, Document> documentList;
    public static volatile SingularAttribute<Enfant, Employe> employe;
    public static volatile SingularAttribute<Enfant, Integer> id;
    public static volatile SingularAttribute<Enfant, String> prenom;
    public static volatile SingularAttribute<Enfant, String> nom;

}