package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Civilite;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-01T09:14:27")
@StaticMetamodel(Situationmatrimoniale.class)
public class Situationmatrimoniale_ { 

    public static volatile ListAttribute<Situationmatrimoniale, Employe> employeList;
    public static volatile SingularAttribute<Situationmatrimoniale, String> libelle;
    public static volatile SingularAttribute<Situationmatrimoniale, Integer> id;
    public static volatile ListAttribute<Situationmatrimoniale, Civilite> civiliteList;

}