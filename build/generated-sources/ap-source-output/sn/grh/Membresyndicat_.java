package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Syndicat;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:41")
@StaticMetamodel(Membresyndicat.class)
public class Membresyndicat_ { 

    public static volatile SingularAttribute<Membresyndicat, Boolean> encours;
    public static volatile SingularAttribute<Membresyndicat, Date> dateDebut;
    public static volatile ListAttribute<Membresyndicat, Document> documentList;
    public static volatile SingularAttribute<Membresyndicat, Employe> employe;
    public static volatile SingularAttribute<Membresyndicat, Syndicat> syndicat;
    public static volatile SingularAttribute<Membresyndicat, Integer> id;
    public static volatile SingularAttribute<Membresyndicat, Date> dateFin;

}