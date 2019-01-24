package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Caissesociale;
import sn.grh.Document;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-24T12:06:23")
@StaticMetamodel(Membrecaissesociale.class)
public class Membrecaissesociale_ { 

    public static volatile SingularAttribute<Membrecaissesociale, Boolean> encours;
    public static volatile SingularAttribute<Membrecaissesociale, Caissesociale> caisseSociale;
    public static volatile SingularAttribute<Membrecaissesociale, Date> dateDebut;
    public static volatile ListAttribute<Membrecaissesociale, Document> documentList;
    public static volatile SingularAttribute<Membrecaissesociale, Employe> employe;
    public static volatile SingularAttribute<Membrecaissesociale, String> matriculeCaisseSociale;
    public static volatile SingularAttribute<Membrecaissesociale, Integer> id;
    public static volatile SingularAttribute<Membrecaissesociale, Date> dateFin;
    public static volatile SingularAttribute<Membrecaissesociale, Float> poucentage;

}