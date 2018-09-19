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
import static sn.grh.Accesgroupe_.groupe;
import sn.grh.Groupetypeemploye;
import sn.grh.Typeemploye;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.groupetypeemploye")
public class GroupetypeemployeFacadeREST extends AbstractFacade<Groupetypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public GroupetypeemployeFacadeREST() {
        super(Groupetypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Groupetypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Groupetypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @DELETE
    @Path("groupe/{groupe}/typeemploye/{typeemploye}")
    public void remove(@PathParam("groupe") Integer groupe, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findByGroupeAndTypeEmploye(groupe,typeemploye));
    }

    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Groupetypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("groupe/{groupe}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Groupetypeemploye findByGroupeAndTypeEmploye(@PathParam("groupe") Integer groupe,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Groupetypeemploye> li=em.createQuery("SELECT ge FROM Groupetypeemploye ge WHERE"
                + " ge.groupe.id=:groupe AND ge.typeEmploye.id=:typeemploye", Groupetypeemploye.class)
                .setParameter("groupe", groupe)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("groupe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findByGroupe(@PathParam("id") Integer id) {
        List<Typeemploye> li=em.createQuery("SELECT ge.typeEmploye FROM Groupetypeemploye ge WHERE ge.groupe.id =:id", Typeemploye.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Groupetypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Groupetypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
