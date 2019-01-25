package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Mutuellesante;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:41")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
@StaticMetamodel(Membremutuelle.class)
public class Membremutuelle_ { 

    public static volatile SingularAttribute<Membremutuelle, Boolean> encours;
    public static volatile SingularAttribute<Membremutuelle, Date> dateDebut;
    public static volatile ListAttribute<Membremutuelle, Document> documentList;
    public static volatile SingularAttribute<Membremutuelle, Employe> employe;
    public static volatile SingularAttribute<Membremutuelle, Integer> id;
    public static volatile SingularAttribute<Membremutuelle, Date> dateFin;
    public static volatile SingularAttribute<Membremutuelle, Mutuellesante> mutuelleSante;

}