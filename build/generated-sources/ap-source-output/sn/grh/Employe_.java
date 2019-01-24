package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Adresse;
import sn.grh.Avoircompetence;
import sn.grh.Conjoint;
import sn.grh.Contact;
import sn.grh.Document;
import sn.grh.Enfant;
import sn.grh.Formation;
import sn.grh.Genre;
import sn.grh.Historiquegrade;
import sn.grh.Membrecaissesociale;
import sn.grh.Membremutuelle;
import sn.grh.Membresyndicat;
import sn.grh.Servir;
import sn.grh.Situationmatrimoniale;
import sn.grh.Typeemploye;
import sn.grh.Utilisateur;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-01-24T12:06:23")
@StaticMetamodel(Employe.class)
public class Employe_ { 

    public static volatile SingularAttribute<Employe, Situationmatrimoniale> situationMatrimoniale;
    public static volatile ListAttribute<Employe, Servir> servirList;
    public static volatile SingularAttribute<Employe, String> numeroCni;
    public static volatile SingularAttribute<Employe, Boolean> retraite;
    public static volatile ListAttribute<Employe, Conjoint> conjointList;
    public static volatile SingularAttribute<Employe, String> nom;
    public static volatile SingularAttribute<Employe, Date> dateRecrutement;
    public static volatile ListAttribute<Employe, Absence> absenceList;
    public static volatile ListAttribute<Employe, Membrecaissesociale> membrecaissesocialeList;
    public static volatile SingularAttribute<Employe, String> matriculeMainDoeuvre;
    public static volatile ListAttribute<Employe, Membresyndicat> membresyndicatList;
    public static volatile SingularAttribute<Employe, Genre> genre;
    public static volatile SingularAttribute<Employe, Integer> id;
    public static volatile SingularAttribute<Employe, String> prenom;
    public static volatile ListAttribute<Employe, Historiquegrade> historiquegradeList;
    public static volatile ListAttribute<Employe, Utilisateur> utilisateurList;
    public static volatile SingularAttribute<Employe, String> nationalite;
    public static volatile SingularAttribute<Employe, Boolean> geler;
    public static volatile SingularAttribute<Employe, String> matriculeInterne;
    public static volatile ListAttribute<Employe, Adresse> adresseList;
    public static volatile SingularAttribute<Employe, String> lieuDeNaissance;
    public static volatile ListAttribute<Employe, Avoircompetence> avoircompetenceList;
    public static volatile SingularAttribute<Employe, Date> dateDeNaissance;
    public static volatile ListAttribute<Employe, Contact> contactList;
    public static volatile SingularAttribute<Employe, Typeemploye> typeEmploye;
    public static volatile ListAttribute<Employe, Document> documentList;
    public static volatile ListAttribute<Employe, Formation> formationList;
    public static volatile ListAttribute<Employe, Membremutuelle> membremutuelleList;
    public static volatile ListAttribute<Employe, Enfant> enfantList;

}