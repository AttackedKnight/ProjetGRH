package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Syndicattypeemploye;

<<<<<<< HEAD
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T18:18:40")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T13:52:09")
>>>>>>> e3daec2c89da717fb7b6f858590a0117e8aee26b
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-11T13:52:09")
>>>>>>> e3daec2c89da717fb7b6f858590a0117e8aee26b
@StaticMetamodel(Syndicat.class)
public class Syndicat_ { 

    public static volatile SingularAttribute<Syndicat, String> code;
    public static volatile ListAttribute<Syndicat, Employe> employeList;
    public static volatile ListAttribute<Syndicat, Syndicattypeemploye> syndicattypeemployeList;
    public static volatile SingularAttribute<Syndicat, Integer> id;
    public static volatile SingularAttribute<Syndicat, String> nomSyndicat;

}