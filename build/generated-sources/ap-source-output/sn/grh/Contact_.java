package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-17T17:29:15")
@StaticMetamodel(Contact.class)
public class Contact_ { 

    public static volatile SingularAttribute<Contact, String> numero1;
    public static volatile SingularAttribute<Contact, String> numero2;
    public static volatile SingularAttribute<Contact, Employe> employe;
    public static volatile SingularAttribute<Contact, Integer> id;
    public static volatile SingularAttribute<Contact, String> email;

}