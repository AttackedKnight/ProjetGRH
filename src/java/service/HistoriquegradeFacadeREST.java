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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Masculin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Féminin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Masculin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g WHERE g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Féminin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    /* FIN STATISTIQUE NIVEAU ETUDE*/

     
    /*ok*/
    
    /*RECUPERER LES INFORMATIONS SUR LES AVANCEMENTS DES EMPLOYES DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancement(@PathParam("types") String types){
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1"
                + " AND h.employe.typeEmploye.id IN ("+types+")",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE FEMININ DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/femme/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementFemme(@PathParam("types") String types){
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 "
                + " AND h.employe.genre.libelle='Féminin' AND h.employe.typeEmploye.id IN ("+types+")",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE MASCULIN DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/homme/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementHomme(@PathParam("types") String types){
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 "
                + " AND h.employe.genre.libelle='Masculin' AND h.employe.typeEmploye.id IN ("+types+")",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementEntite(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.finService = 0 AND s.employe.typeEmploye.id IN ("+types+"))", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE FEMININ D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/femme/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementEntiteFemme(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.libelle='Féminin' AND"
                + " s.employe.typeEmploye.id IN ("+types+"))", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE MASCULIN D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/homme/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementEntiteHomme(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.libelle='Masculin' AND"
                + " s.employe.typeEmploye.id IN ("+types+"))", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    
    /*ok*/
    
    
}
