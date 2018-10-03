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
import sn.grh.Syndicat;
import sn.grh.Syndicattypeemploye;
import sn.grh.Typeemploye;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.syndicattypeemploye")
public class SyndicattypeemployeFacadeREST extends AbstractFacade<Syndicattypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public SyndicattypeemployeFacadeREST() {
        super(Syndicattypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Syndicattypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Syndicattypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @DELETE
    @Path("syndicat/{syndicat}/typeemploye/{typeemploye}")
    public void remove(@PathParam("syndicat") Integer syndicat, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findBySyndicatAndTypeEmploye(syndicat,typeemploye));
    }
    
    @GET
    @Path("syndicat/{syndicat}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Syndicattypeemploye findBySyndicatAndTypeEmploye(@PathParam("syndicat") Integer syndicat,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Syndicattypeemploye> li=em.createQuery("SELECT sy FROM Syndicattypeemploye sy WHERE"
                + " sy.syndicat.id=:syndicat AND sy.typeEmploye.id=:typeemploye", Syndicattypeemploye.class)
                .setParameter("syndicat", syndicat)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("syndicat/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findBySyndicat(@PathParam("id") Integer id) {
        List<Typeemploye> li=em.createQuery("SELECT sy.typeEmploye FROM Syndicattypeemploye sy WHERE sy.syndicat.id =:id", Typeemploye.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    @GET
    @Path("type/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicat> findByType(@PathParam("id") Integer id) {
        List<Syndicat> li=em.createQuery("SELECT sy.syndicat FROM Syndicattypeemploye sy WHERE sy.typeEmploye.id =:id", Syndicat.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Syndicattypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicattypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicattypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
