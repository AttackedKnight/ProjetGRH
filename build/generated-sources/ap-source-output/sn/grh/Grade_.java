package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Categorie;
import sn.grh.Classe;
import sn.grh.Corps;
import sn.grh.Echelon;
import sn.grh.Gradetypeemploye;
import sn.grh.Historiquegrade;
import sn.grh.Niveau;
import sn.grh.Typeavancement;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-02T12:59:19")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-30T12:14:08")
>>>>>>> b25d4eb239b8d427ca95fe33e414e7c2254ea3a6
@StaticMetamodel(Grade.class)
public class Grade_ { 

    public static volatile ListAttribute<Grade, Gradetypeemploye> gradetypeemployeList;
    public static volatile SingularAttribute<Grade, Classe> classe;
    public static volatile SingularAttribute<Grade, Categorie> categorie;
    public static volatile SingularAttribute<Grade, Integer> indice;
    public static volatile SingularAttribute<Grade, Integer> duree;
    public static volatile SingularAttribute<Grade, Integer> id;
    public static volatile SingularAttribute<Grade, Integer> salaireBase;
    public static volatile SingularAttribute<Grade, Niveau> niveau;
    public static volatile ListAttribute<Grade, Historiquegrade> historiquegradeList;
    public static volatile SingularAttribute<Grade, Corps> corps;
    public static volatile SingularAttribute<Grade, Echelon> echelon;
    public static volatile SingularAttribute<Grade, Typeavancement> typeAvancement;

}