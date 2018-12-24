package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Genre;
import sn.grh.Situationmatrimoniale;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-12-02T12:59:19")
@StaticMetamodel(Civilite.class)
public class Civilite_ { 

    public static volatile SingularAttribute<Civilite, Situationmatrimoniale> situationMatrimoniale;
    public static volatile SingularAttribute<Civilite, String> code;
    public static volatile SingularAttribute<Civilite, String> libelle;
    public static volatile SingularAttribute<Civilite, Genre> genre;
    public static volatile SingularAttribute<Civilite, Integer> id;

}