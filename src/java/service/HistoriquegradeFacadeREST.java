/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import sn.grh.Employe;
import sn.grh.Historiquegrade;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.historiquegrade")
public class HistoriquegradeFacadeREST extends AbstractFacade<Historiquegrade> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public HistoriquegradeFacadeREST() {
        super(Historiquegrade.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Historiquegrade entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Historiquegrade entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Historiquegrade find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEmploye(@PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM  Historiquegrade h WHERE h.employe.id = :id ORDER BY h.id DESC", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
    /* STATTISTIQUE NIVEAU D'ETUDE*/
    
    
    @GET
    @Path("pats/classe/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsParClasse(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("pats/homme/classe/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsHommeParClasse(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.sexe='masculin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("pats/femme/classe/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsFemmeParClasse(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.sexe='feminin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("per/corps/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerParCorps(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }

    @GET
    @Path("per/homme/corps/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerHommeParCorps(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.sexe='masculin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("per/femme/corps/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerFemmeParCorps(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.sexe='feminin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    /* FIN STATISTIQUE NIVEAU ETUDE*/
    
    /*  general  */
     
    @GET
    @Path("date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancement(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementInferieur(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementSuperieur(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententre(@PathParam("date1") String date1, @PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*Generale par entite*/
    
    @GET
    @Path("date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancement(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementInferieur(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementSuperieur(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententre(@PathParam("date1") String date1, @PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
   /* Fin generale  */
    
    /* PATS  */
    
    @GET
    @Path("pats/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPats(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PATS'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPats(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PATS'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPats(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PATS'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePats(@PathParam("date1") String date1, @PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PATS'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*PATS ENTITE*/
    
    @GET
    @Path("pats/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPats(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPats(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPats(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePats(@PathParam("date1") String date1, @PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*  PATS HOMME ET FEMME PAR ENTITE*/
    
    @GET
    @Path("pats/homme/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPatsHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPatsHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPatsHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePatsHomme(@PathParam("date1") String date1, @PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPatsFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPatsFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPatsFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePatsFemme(@PathParam("date1") String date1, @PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PATS'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    /*PATS HOMME*/
    
    @GET
    @Path("pats/homme/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPatsHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPatsHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPatsHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/homme/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePatsHomme(@PathParam("date1") String date1, @PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    
    /*PATS FEMME*/
    
    @GET
    @Path("pats/femme/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPatsFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPatsFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPatsFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("pats/femme/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePatsFemme(@PathParam("date1") String date1, @PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PATS' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    /* FIN PATS  */  
    
    /* PER  */ 
    
    @GET
    @Path("per/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPer(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PER'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPer(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PER'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPer(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PER'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePer(@PathParam("date1") String date1,@PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PER'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    
    /*PER ENTITE*/
    
    @GET
    @Path("per/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPer(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPer(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.typeEmploye.code='PER'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPer(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePer(@PathParam("date1") String date1,@PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    
    /*  HOMME ET FEMME PER PAR ENTITE   */
    
    @GET
    @Path("per/homme/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPerHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/homme/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPerHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PER'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/homme/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPerHomme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/homme/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePerHomme(@PathParam("date1") String date1,@PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.sexe='masculin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    
    @GET
    @Path("per/femme/date/avancement/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementPerFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/femme/date/avant/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementinferieurPerFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PER'"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/femme/date/apres/{date}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancementsuperieurPerFemme(@PathParam("date") String date, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/femme/date/entre/{date1}/{date2}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEntiteProchainAvancemententrePerFemme(@PathParam("date1") String date1,@PathParam("date2") String date2, @PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"' AND h.employe.sexe='feminin' AND h.employe.typeEmploye.code='PER' "
                + "AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.fin=NULL)", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*    PER HOMME*/
    
    @GET
    @Path("per/homme/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPerHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/homme/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPerHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/homme/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPerHomme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/homme/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePerHomme(@PathParam("date1") String date1,@PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='masculin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*    PER FEMME*/
    
    @GET
    @Path("per/femme/date/avancement/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementPerFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement='"+date+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    @GET
    @Path("per/femme/date/avant/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementinferieurPerFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement<'"+date+"'AND h.employe.typeEmploye.code='PER'  AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/femme/date/apres/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancementsuperieurPerFemme(@PathParam("date") String date) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>'"+date+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("per/femme/date/entre/{date1}/{date2}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByProchainAvancemententrePerFemme(@PathParam("date1") String date1,@PathParam("date2") String date2) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 and h.dateProchainAvancement>='"+date1+"' and h.dateProchainAvancement<='"+date2+"'AND h.employe.typeEmploye.code='PER' AND h.employe.sexe='feminin'", Historiquegrade.class)
              
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    /* FIN PER  */ 
}
