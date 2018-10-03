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
import sn.grh.Civilite;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.civilite")
public class CiviliteFacadeREST extends AbstractFacade<Civilite> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public CiviliteFacadeREST() {
        super(Civilite.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Civilite entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Civilite entity) {
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
    public Civilite find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("genre/{genre}/situation/{situation}")
    @Produces({MediaType.APPLICATION_JSON})
    public Civilite findByGenreAndSituation(@PathParam("genre") Integer genre , @PathParam("situation") Integer situation) {
        List<Civilite> c = em.createQuery("SELECT c FROM Civilite c WHERE c.genre.id = :genre"
                + " AND c.situationMatrimoniale.id = :situation", Civilite.class)
                .setParameter("genre", genre)
                .setParameter("situation", situation)
                .getResultList();
        if(c.size() > 0){
            return c.get(0);
        }
        return null;
    }
    
    @GET
    @Path("genre/{genre}")
    @Produces({MediaType.APPLICATION_JSON})
    public Civilite findByGenre(@PathParam("genre") Integer genre) {
        List<Civilite> c = em.createQuery("SELECT c FROM Civilite c WHERE c.genre.id = :genre", Civilite.class)
                .setParameter("genre", genre)
                .getResultList();
        if(c.size() > 0){
            return c.get(0);
        }
        return null;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Civilite> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Civilite> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
