package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;
import sn.grh.Syndicattypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-02T12:59:19")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-30T12:14:08")
>>>>>>> b25d4eb239b8d427ca95fe33e414e7c2254ea3a6
@StaticMetamodel(Syndicat.class)
public class Syndicat_ { 

    public static volatile SingularAttribute<Syndicat, String> code;
    public static volatile ListAttribute<Syndicat, Employe> employeList;
    public static volatile ListAttribute<Syndicat, Syndicattypeemploye> syndicattypeemployeList;
    public static volatile SingularAttribute<Syndicat, Integer> id;
    public static volatile SingularAttribute<Syndicat, String> nomSyndicat;

}