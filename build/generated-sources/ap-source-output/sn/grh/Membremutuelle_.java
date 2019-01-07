package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Employe;
import sn.grh.Mutuellesante;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-07T09:53:36")
@StaticMetamodel(Membremutuelle.class)
public class Membremutuelle_ { 

    public static volatile ListAttribute<Membremutuelle, Document> documentList;
    public static volatile SingularAttribute<Membremutuelle, Employe> employe;
    public static volatile SingularAttribute<Membremutuelle, Integer> id;
    public static volatile SingularAttribute<Membremutuelle, Mutuellesante> mutuelleSante;

}