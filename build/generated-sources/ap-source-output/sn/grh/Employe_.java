package sn.grh;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import sn.grh.Absence;
import sn.grh.Adresse;
import sn.grh.Avoircompetence;
import sn.grh.Caissesociale;
import sn.grh.Conge;
import sn.grh.Contact;
import sn.grh.Document;
import sn.grh.Formation;
import sn.grh.Genre;
import sn.grh.Historiquegrade;
import sn.grh.Membremutuelle;
import sn.grh.Servir;
import sn.grh.Situationmatrimoniale;
import sn.grh.Syndicat;
import sn.grh.Typeemploye;
import sn.grh.Utilisateur;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-10-08T15:56:59")
@StaticMetamodel(Employe.class)
public class Employe_ { 

    public static volatile SingularAttribute<Employe, Situationmatrimoniale> situationMatrimoniale;
    public static volatile ListAttribute<Employe, Servir> servirList;
    public static volatile SingularAttribute<Employe, String> numeroCni;
    public static volatile SingularAttribute<Employe, Syndicat> syndicat;
    public static volatile SingularAttribute<Employe, Boolean> retraite;
    public static volatile SingularAttribute<Employe, String> nom;
    public static volatile SingularAttribute<Employe, Date> dateRecrutement;
    public static volatile SingularAttribute<Employe, Caissesociale> caisseSociale;
    public static volatile ListAttribute<Employe, Absence> absenceList;
    public static volatile SingularAttribute<Employe, Genre> genre;
    public static volatile SingularAttribute<Employe, Integer> id;
    public static volatile SingularAttribute<Employe, String> prenom;
    public static volatile ListAttribute<Employe, Historiquegrade> historiquegradeList;
    public static volatile SingularAttribute<Employe, Integer> nombreEnfant;
    public static volatile ListAttribute<Employe, Utilisateur> utilisateurList;
    public static volatile SingularAttribute<Employe, String> nationalite;
    public static volatile SingularAttribute<Employe, Boolean> geler;
    public static volatile ListAttribute<Employe, Conge> congeList;
    public static volatile SingularAttribute<Employe, String> matriculeInterne;
    public static volatile ListAttribute<Employe, Adresse> adresseList;
    public static volatile SingularAttribute<Employe, String> lieuDeNaissance;
    public static volatile ListAttribute<Employe, Avoircompetence> avoircompetenceList;
    public static volatile SingularAttribute<Employe, Date> dateDeNaissance;
    public static volatile SingularAttribute<Employe, Integer> nombreDeFemme;
    public static volatile ListAttribute<Employe, Contact> contactList;
    public static volatile SingularAttribute<Employe, Typeemploye> typeEmploye;
    public static volatile ListAttribute<Employe, Document> documentList;
    public static volatile SingularAttribute<Employe, String> matriculeCaisseSociale;
    public static volatile ListAttribute<Employe, Formation> formationList;
    public static volatile ListAttribute<Employe, Membremutuelle> membremutuelleList;

}