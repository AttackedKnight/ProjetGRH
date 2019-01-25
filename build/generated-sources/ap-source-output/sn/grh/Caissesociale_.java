package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Caissesocialetypeemploye;
import sn.grh.Membrecaissesociale;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
@StaticMetamodel(Caissesociale.class)
public class Caissesociale_ { 

    public static volatile ListAttribute<Caissesociale, Membrecaissesociale> membrecaissesocialeList;
    public static volatile SingularAttribute<Caissesociale, String> code;
    public static volatile ListAttribute<Caissesociale, Caissesocialetypeemploye> caissesocialetypeemployeList;
    public static volatile SingularAttribute<Caissesociale, String> libelle;
    public static volatile SingularAttribute<Caissesociale, Integer> id;

}