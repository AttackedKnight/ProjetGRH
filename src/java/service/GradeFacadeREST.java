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
import sn.grh.Grade;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.grade")
public class GradeFacadeREST extends AbstractFacade<Grade> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public GradeFacadeREST() {
        super(Grade.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Grade entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Grade entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Grade find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findByEmploye(@PathParam("id") Integer id) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.employe.id = :id ORDER BY g.id DESC", Grade.class)
                .setParameter("id", id)
                .getResultList();
        return g;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("pats/classe/{libelle}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsParClasse(@PathParam("libelle") String libelle){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.classe.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.classe.libelle=:libelle AND g.encours=1 AND g.employe.sexe='masculin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.classe.libelle=:libelle AND g.encours=1 AND g.employe.sexe='feminin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.corps.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.corps.libelle=:libelle AND g.encours=1 AND g.employe.sexe='masculin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
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
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Grade g WHERE g.corps.libelle=:libelle AND g.encours=1 AND g.employe.sexe='feminin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
    
}
