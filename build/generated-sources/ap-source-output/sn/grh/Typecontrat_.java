package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Servir;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-07T09:33:47")
@StaticMetamodel(Typecontrat.class)
public class Typecontrat_ { 

    public static volatile SingularAttribute<Typecontrat, String> code;
    public static volatile SingularAttribute<Typecontrat, String> libelle;
    public static volatile ListAttribute<Typecontrat, Servir> servirList;
    public static volatile SingularAttribute<Typecontrat, Integer> id;

}