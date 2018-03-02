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
import sn.grh.Diplome;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.diplome")
public class DiplomeFacadeREST extends AbstractFacade<Diplome> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public DiplomeFacadeREST() {
        super(Diplome.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Diplome entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Diplome entity) {
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
    public Diplome find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Diplome> findAll() {
        return super.findAll();
    }
    
     @GET
    @Path("nom/{nom}")
    @Produces({MediaType.APPLICATION_JSON})
    public Diplome findDiplome(@PathParam("nom") String nom) {
        List<Diplome> d =em.createQuery("SELECT d FROM Diplome d WHERE d.nom = :nom", Diplome.class)
                .setParameter("nom", nom)
                .getResultList();
        
        if(d.size()>0){
            System.err.println(d.get(0).getNom());
            return d.get(0);
        }
        return null;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Diplome> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
