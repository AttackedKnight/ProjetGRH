package sn.grh;

import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Document;
import sn.grh.Domaine;
import sn.grh.Employe;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-11-28T11:01:02")
@StaticMetamodel(Avoircompetence.class)
public class Avoircompetence_ { 

    public static volatile SingularAttribute<Avoircompetence, Domaine> competence;
    public static volatile ListAttribute<Avoircompetence, Document> documentList;
    public static volatile SingularAttribute<Avoircompetence, Employe> employe;
    public static volatile SingularAttribute<Avoircompetence, String> description;
    public static volatile SingularAttribute<Avoircompetence, Integer> id;

}