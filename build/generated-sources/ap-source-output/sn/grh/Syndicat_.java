package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Syndicattypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:52")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T10:54:18")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T12:32:07")
>>>>>>> 4b4c1760fbced970b7ab4e104c492f64037af156
>>>>>>> 920c05e4a816cd3bc4916740ecf205a7a58e1ea0
@StaticMetamodel(Syndicat.class)
public class Syndicat_ { 

    public static volatile SingularAttribute<Syndicat, String> code;
    public static volatile ListAttribute<Syndicat, Employe> employeList;
    public static volatile ListAttribute<Syndicat, Syndicattypeemploye> syndicattypeemployeList;
    public static volatile SingularAttribute<Syndicat, Integer> id;
    public static volatile SingularAttribute<Syndicat, String> nomSyndicat;

}