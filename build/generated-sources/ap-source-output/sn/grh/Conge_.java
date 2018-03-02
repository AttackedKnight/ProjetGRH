package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-02-28T15:49:43")
@StaticMetamodel(Conge.class)
public class Conge_ { 

    public static volatile SingularAttribute<Conge, Integer> etatTraitement;
    public static volatile SingularAttribute<Conge, Date> dateDebut;
    public static volatile SingularAttribute<Conge, Employe> employe;
    public static volatile SingularAttribute<Conge, Integer> duree;
    public static volatile SingularAttribute<Conge, Integer> id;
    public static volatile SingularAttribute<Conge, Date> dateFin;
    public static volatile SingularAttribute<Conge, Date> dateEnregistrement;

}