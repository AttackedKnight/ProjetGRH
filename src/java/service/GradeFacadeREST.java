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
    @Path("per")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findGradePer() {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps<>NULL", Grade.class)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    @GET
    @Path("per/corps/{corps}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPerCorps(@PathParam("corps") String corps) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps<>NULL AND g.corps.libelle=:libelle", Grade.class)
                .setParameter("libelle", corps)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    
    @GET
    @Path("per/corps/{corps}/classe/{classe}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPerCorpsEtClasse(@PathParam("corps") String corps,@PathParam("classe") String classe) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps<>NULL AND g.corps.libelle=:corps AND g.classe.libelle=:classe", Grade.class)
                .setParameter("corps", corps)
                .setParameter("classe", classe)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    
    @GET
    @Path("per/classe/corps/{corps}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPerClasseCorps(@PathParam("corps") String corps) {
        List<Grade> g=em.createQuery("SELECT DISTINCT g.classe FROM Grade g WHERE g.corps<>NULL AND g.corps.libelle=:corps", Grade.class)
                .setParameter("corps", corps)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    @GET
    @Path("pats")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findGradePats() {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps=NULL", Grade.class)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }

    @GET
    @Path("pats/classe/{classe}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPatsClasse(@PathParam("classe") String classe) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps=NULL AND g.classe.libelle=:classe", Grade.class)
                .setParameter("classe", classe)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    
    @GET
    @Path("pats/categorie/classe/{classe}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPatsCategorieClasse(@PathParam("classe") String classe) {
        List<Grade> g=em.createQuery("SELECT DISTINCT g.categorie FROM Grade g WHERE g.corps=NULL AND g.classe.libelle=:classe", Grade.class)
                .setParameter("classe", classe)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    @GET
    @Path("pats/niveau/classe/{classe}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPatsNiveauClasse(@PathParam("classe") String classe) {
        List<Grade> g=em.createQuery("SELECT DISTINCT g.niveau FROM Grade g WHERE g.corps=NULL AND g.classe.libelle=:classe", Grade.class)
                .setParameter("classe", classe)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    @GET
    @Path("pats/classe/{classe}/categorie/{categorie}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPatsClasseEtCategorie(@PathParam("classe") String classe,@PathParam("classe") String categorie) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps=NULL AND g.classe.libelle=:classe AND g.categorie.libelle=:categorie", Grade.class)
                .setParameter("classe", classe)
                .setParameter("categorie", categorie)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    @GET
    @Path("pats/classe/{classe}/categorie/{categorie}/niveau/{niveau}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findPatsClasseEtCategorie(@PathParam("classe") String classe,@PathParam("categorie") String categorie,@PathParam("niveau") String niveau) {
        List<Grade> g=em.createQuery("SELECT g FROM Grade g WHERE g.corps=NULL AND g.classe.libelle=:classe AND g.categorie.libelle=:categorie AND g.niveau.libelle=:niveau", Grade.class)
                .setParameter("classe", classe)
                .setParameter("categorie", categorie)
                .setParameter("niveau", niveau)
                .getResultList();
        if(g.size()>0){
            return g;
        }        
        return null;
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
    
    
    @GET
    @Path("nombre/{taille}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findLast(@PathParam("taille") Integer taille) {
        List<Grade> li=em.createQuery("SELECT gt FROM Grade gt ORDER BY gt.id DESC", Grade.class).setMaxResults(taille)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    

    @GET
    @Path("id/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Grade findById(@PathParam("id") Integer id) {
        List<Grade> li=em.createQuery("SELECT gt FROM Grade gt WHERE gt.id =:id", Grade.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
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
