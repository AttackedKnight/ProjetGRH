package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Caissesociale;
import sn.grh.Employe;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T11:51:15")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:41")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
>>>>>>> ddba5288e695677d076de01e62bb52b19b3f4e84
@StaticMetamodel(Membrecaissesociale.class)
public class Membrecaissesociale_ { 

    public static volatile SingularAttribute<Membrecaissesociale, Boolean> encours;
    public static volatile SingularAttribute<Membrecaissesociale, Caissesociale> caisseSociale;
    public static volatile SingularAttribute<Membrecaissesociale, Date> dateDebut;
    public static volatile SingularAttribute<Membrecaissesociale, Employe> employe;
    public static volatile SingularAttribute<Membrecaissesociale, String> matriculeCaisseSociale;
    public static volatile SingularAttribute<Membrecaissesociale, Integer> id;
    public static volatile SingularAttribute<Membrecaissesociale, Date> dateFin;
    public static volatile SingularAttribute<Membrecaissesociale, Float> poucentage;

}