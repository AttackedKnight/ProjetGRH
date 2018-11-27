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
import sn.grh.Typeabsence;

/**
 *
 * @author Baba Mbengue
 */
@Stateless
@Path("sn.grh.typeabsence")
public class TypeabsenceFacadeREST extends AbstractFacade<Typeabsence> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public TypeabsenceFacadeREST() {
        super(Typeabsence.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Typeabsence entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Typeabsence entity) {
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
    public Typeabsence find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeabsence> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeabsence> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
@GET
    @Path("libelle/{lib}")
    @Produces({MediaType.APPLICATION_JSON})
    public Typeabsence findByLibelle(@PathParam("lib") String lib) {
        List<Typeabsence> li=em.createQuery("SELECT ta FROM Typeabsence ta WHERE ta.libelle =:libelle", Typeabsence.class)
                .setParameter("libelle", lib)
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
