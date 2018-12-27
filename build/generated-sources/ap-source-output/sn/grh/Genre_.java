package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Civilite;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T15:22:15")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-26T12:25:18")
>>>>>>> 62cdb53c7f0e59cfec7a9d342c957cf83cffbdfe
@StaticMetamodel(Genre.class)
public class Genre_ { 

    public static volatile ListAttribute<Genre, Employe> employeList;
    public static volatile SingularAttribute<Genre, String> libelle;
    public static volatile SingularAttribute<Genre, Integer> id;
    public static volatile ListAttribute<Genre, Civilite> civiliteList;

}