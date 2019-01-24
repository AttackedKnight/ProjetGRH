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
import sn.grh.Institution;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.institution")
public class InstitutionFacadeREST extends AbstractFacade<Institution> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public InstitutionFacadeREST() {
        super(Institution.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Institution entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Institution entity) {
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
    public Institution find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("last")
    @Produces({MediaType.APPLICATION_JSON})
    public Institution findLast(){
        List<Institution> h=em.createQuery("SELECT h FROM Institution h ORDER BY h.id DESC",Institution.class)
                .getResultList();
        if(h.size()>0){
            return h.get(0);
        }
        return null;
    }
    
    @GET
    @Path("nom/{nom}")
    @Produces({MediaType.APPLICATION_JSON})
    public Institution findByNom(@PathParam("nom") String nom){
        List<Institution> h=em.createQuery("SELECT h FROM Institution h WHERE h.nom=: nom",Institution.class)
                .setParameter("nom", nom)
                .getResultList();
        if(h.size()>0){
            return h.get(0);
        }
        return null;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Institution> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Institution> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
