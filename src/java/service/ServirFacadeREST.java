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
import sn.grh.Servir;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.servir")
public class ServirFacadeREST extends AbstractFacade<Servir> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public ServirFacadeREST() {
        super(Servir.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Servir entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Servir entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("finservice/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void finirService(@PathParam("id") Integer id, Servir entity) {
        super.edit(entity);
    }
    
    @GET
    @Path("enservice/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Boolean enservice(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.id=:id AND s.fin = NULL", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0){
            return true;
        }
        return false;
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findByEmploye(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0){
            return s;
        }
        return null;
    }
    
    @GET
    @Path("responsable/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir findResponsableEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.responsable=true ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s.get(0);
        }
        return null;
        
    }
    
    @GET
    @Path("effectif/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer countEmployeEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.fin = NULL", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0)
            return s.size();
        else
            return 0;
           
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findAll() {
        return super.findAll();
    }
    
     @GET
    @Path("per")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPer() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PER'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("pats")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPats() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PATS'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }

     @GET
    @Path("per/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPerEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PER' AND s.entite.id=:id", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("pats/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPatsEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PATS' AND s.entite.id=:id", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
        @GET
    @Path("hommeper")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPerHomme() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PER' and s.employe.sexe='masculin'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
            @GET
    @Path("femmeper")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPerFemme() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PER' and s.employe.sexe='feminin'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    @GET
    @Path("hommepats")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPatsHomme() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PATS' and s.employe.sexe='masculin'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    @GET
    @Path("femmepats")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findPatsFemme() {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.typeEmploye.code = 'PATS' and s.employe.sexe='feminin'", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
