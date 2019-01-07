package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Avoircompetence;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T09:53:36")
@StaticMetamodel(Domaine.class)
public class Domaine_ { 

    public static volatile SingularAttribute<Domaine, String> libelle;
    public static volatile SingularAttribute<Domaine, Integer> id;
    public static volatile ListAttribute<Domaine, Avoircompetence> avoircompetenceList;

}