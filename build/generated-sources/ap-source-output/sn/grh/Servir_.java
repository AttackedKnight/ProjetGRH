package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Entite;
import sn.grh.Fonction;
import sn.grh.Typecontrat;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:29")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:29")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Servir.class)
public class Servir_ { 

    public static volatile SingularAttribute<Servir, Date> debut;
    public static volatile SingularAttribute<Servir, Entite> entite;
    public static volatile SingularAttribute<Servir, Boolean> responsable;
    public static volatile SingularAttribute<Servir, Employe> employe;
    public static volatile SingularAttribute<Servir, Typecontrat> typeContrat;
    public static volatile SingularAttribute<Servir, Boolean> finService;
    public static volatile SingularAttribute<Servir, Fonction> fonction;
    public static volatile SingularAttribute<Servir, Date> fin;
    public static volatile SingularAttribute<Servir, Integer> dureeDuContrat;
    public static volatile SingularAttribute<Servir, Integer> id;

}