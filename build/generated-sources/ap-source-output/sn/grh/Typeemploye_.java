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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:28")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:30")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
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