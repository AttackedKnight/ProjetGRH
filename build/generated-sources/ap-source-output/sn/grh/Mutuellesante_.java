package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Membremutuelle;
import sn.grh.Mutuellesantetypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-02T12:59:19")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-30T12:14:09")
>>>>>>> b25d4eb239b8d427ca95fe33e414e7c2254ea3a6
@StaticMetamodel(Mutuellesante.class)
public class Mutuellesante_ { 

    public static volatile SingularAttribute<Mutuellesante, String> code;
    public static volatile ListAttribute<Mutuellesante, Membremutuelle> membremutuelleList;
    public static volatile SingularAttribute<Mutuellesante, Integer> id;
    public static volatile ListAttribute<Mutuellesante, Mutuellesantetypeemploye> mutuellesantetypeemployeList;
    public static volatile SingularAttribute<Mutuellesante, String> nom;

}