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
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T11:51:15")
=======
<<<<<<< HEAD
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T09:40:39")
=======
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-25T10:00:42")
>>>>>>> ff529762cddd21f09cc44ec13340571022b471f6
>>>>>>> ddba5288e695677d076de01e62bb52b19b3f4e84
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