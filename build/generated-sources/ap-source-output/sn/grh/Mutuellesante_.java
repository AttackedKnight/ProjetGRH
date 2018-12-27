package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Membremutuelle;
import sn.grh.Mutuellesantetypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:32:34")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-27T09:24:55")
>>>>>>> 0c5b02ebd2500a818d7f03aec7a496744b3d7e8e
@StaticMetamodel(Mutuellesante.class)
public class Mutuellesante_ { 

    public static volatile SingularAttribute<Mutuellesante, String> code;
    public static volatile ListAttribute<Mutuellesante, Membremutuelle> membremutuelleList;
    public static volatile SingularAttribute<Mutuellesante, Integer> id;
    public static volatile ListAttribute<Mutuellesante, Mutuellesantetypeemploye> mutuellesantetypeemployeList;
    public static volatile SingularAttribute<Mutuellesante, String> nom;

}