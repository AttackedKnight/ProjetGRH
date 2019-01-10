package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absencetypeemploye;
import sn.grh.Caissesocialetypeemploye;
import sn.grh.Employe;
import sn.grh.Gradetypeemploye;
import sn.grh.Groupetypeemploye;
import sn.grh.Mutuellesantetypeemploye;
import sn.grh.Syndicattypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:09")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
@StaticMetamodel(Typeemploye.class)
public class Typeemploye_ { 

    public static volatile ListAttribute<Typeemploye, Gradetypeemploye> gradetypeemployeList;
    public static volatile ListAttribute<Typeemploye, Absencetypeemploye> absencetypeemployeList;
    public static volatile SingularAttribute<Typeemploye, String> code;
    public static volatile ListAttribute<Typeemploye, Groupetypeemploye> groupetypeemployeList;
    public static volatile ListAttribute<Typeemploye, Employe> employeList;
    public static volatile ListAttribute<Typeemploye, Caissesocialetypeemploye> caissesocialetypeemployeList;
    public static volatile SingularAttribute<Typeemploye, String> libelle;
    public static volatile ListAttribute<Typeemploye, Syndicattypeemploye> syndicattypeemployeList;
    public static volatile SingularAttribute<Typeemploye, Integer> id;
    public static volatile ListAttribute<Typeemploye, Mutuellesantetypeemploye> mutuellesantetypeemployeList;

}