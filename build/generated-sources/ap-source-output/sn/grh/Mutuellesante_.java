package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Membremutuelle;
import sn.grh.Mutuellesantetypeemploye;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-23T11:28:29")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-26T11:50:29")
>>>>>>> c1ba63b68a8f89a6a6dbfd47a5cda47a6f727cfb
@StaticMetamodel(Mutuellesante.class)
public class Mutuellesante_ { 

    public static volatile SingularAttribute<Mutuellesante, String> code;
    public static volatile ListAttribute<Mutuellesante, Membremutuelle> membremutuelleList;
    public static volatile SingularAttribute<Mutuellesante, Integer> id;
    public static volatile ListAttribute<Mutuellesante, Mutuellesantetypeemploye> mutuellesantetypeemployeList;
    public static volatile SingularAttribute<Mutuellesante, String> nom;

}