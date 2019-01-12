package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Entite;
import sn.grh.Fonction;
import sn.grh.Fonctionannexe;
import sn.grh.Typecontrat;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:09")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
@StaticMetamodel(Servir.class)
public class Servir_ { 

    public static volatile SingularAttribute<Servir, Date> debut;
    public static volatile SingularAttribute<Servir, Entite> entite;
    public static volatile SingularAttribute<Servir, Boolean> responsable;
    public static volatile SingularAttribute<Servir, Employe> employe;
    public static volatile ListAttribute<Servir, Document> documentList;
    public static volatile SingularAttribute<Servir, Typecontrat> typeContrat;
    public static volatile SingularAttribute<Servir, Boolean> finService;
    public static volatile SingularAttribute<Servir, Fonction> fonction;
    public static volatile SingularAttribute<Servir, Date> fin;
    public static volatile SingularAttribute<Servir, Fonctionannexe> fonctionAnnexe;
    public static volatile SingularAttribute<Servir, Integer> dureeDuContrat;
    public static volatile SingularAttribute<Servir, Integer> id;

}