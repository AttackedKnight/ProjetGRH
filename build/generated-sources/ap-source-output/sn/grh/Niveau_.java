package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Grade;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-05-08T10:24:20")
@StaticMetamodel(Niveau.class)
public class Niveau_ { 

    public static volatile ListAttribute<Niveau, Grade> gradeList;
    public static volatile SingularAttribute<Niveau, String> libelle;
    public static volatile SingularAttribute<Niveau, Integer> id;

}