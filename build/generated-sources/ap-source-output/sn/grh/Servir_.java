package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Entite;
import sn.grh.Fonction;
import sn.grh.Typecontrat;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-08T15:56:59")
@StaticMetamodel(Servir.class)
public class Servir_ { 

    public static volatile SingularAttribute<Servir, Date> debut;
    public static volatile SingularAttribute<Servir, Entite> entite;
    public static volatile SingularAttribute<Servir, Boolean> responsable;
    public static volatile SingularAttribute<Servir, Employe> employe;
    public static volatile SingularAttribute<Servir, Typecontrat> typeContrat;
    public static volatile SingularAttribute<Servir, Fonction> fonction;
    public static volatile SingularAttribute<Servir, Date> fin;
    public static volatile SingularAttribute<Servir, Integer> dureeDuContrat;
    public static volatile SingularAttribute<Servir, Integer> id;

}