package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Servir;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-11T17:50:51")
@StaticMetamodel(Fonction.class)
public class Fonction_ { 

    public static volatile SingularAttribute<Fonction, String> libelle;
    public static volatile ListAttribute<Fonction, Servir> servirList;
    public static volatile SingularAttribute<Fonction, Integer> id;
    public static volatile SingularAttribute<Fonction, Boolean> responsabilite;

}