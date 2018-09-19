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
import sn.grh.Mutuellesantetypeemploye;
import sn.grh.Typeemploye;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.mutuellesantetypeemploye")
public class MutuellesantetypeemployeFacadeREST extends AbstractFacade<Mutuellesantetypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public MutuellesantetypeemployeFacadeREST() {
        super(Mutuellesantetypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Mutuellesantetypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Mutuellesantetypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @DELETE
    @Path("mutuellesante/{mutuele}/typeemploye/{typeemploye}")
    public void remove(@PathParam("mutuele") Integer mutuele, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findByMutuelleSanteAndTypeEmploye(mutuele,typeemploye));
    }
    
    @GET
    @Path("mutuellesante/{mutuele}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Mutuellesantetypeemploye findByMutuelleSanteAndTypeEmploye(@PathParam("mutuele") Integer mutuele,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Mutuellesantetypeemploye> li=em.createQuery("SELECT mu FROM Mutuellesantetypeemploye mu WHERE"
                + " mu.mutuelleSante.id=:mutuelle AND mu.typeEmploye.id=:typeemploye", Mutuellesantetypeemploye.class)
                .setParameter("mutuelle", mutuele)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("mutuellesante/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findByMutuelleSante(@PathParam("id") Integer id) {
        List<Typeemploye> li=em.createQuery("SELECT mu.typeEmploye FROM Mutuellesantetypeemploye mu WHERE mu.mutuelleSante.id =:id", Typeemploye.class)
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
    public Mutuellesantetypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Mutuellesantetypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Mutuellesantetypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
