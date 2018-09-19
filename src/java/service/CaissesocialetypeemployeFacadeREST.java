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
import sn.grh.Caissesociale;
import sn.grh.Caissesocialetypeemploye;
import sn.grh.Typeemploye;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.caissesocialetypeemploye")
public class CaissesocialetypeemployeFacadeREST extends AbstractFacade<Caissesocialetypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public CaissesocialetypeemployeFacadeREST() {
        super(Caissesocialetypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Caissesocialetypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Caissesocialetypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
    
    @DELETE
    @Path("caissesociale/{caisse}/typeemploye/{typeemploye}")
    public void remove(@PathParam("caisse") Integer caisse, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findByCaisseSocialeAndTypeEmploye(caisse,typeemploye));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Caissesocialetypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Path("caissesociale/{caisse}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Caissesocialetypeemploye findByCaisseSocialeAndTypeEmploye(@PathParam("caisse") Integer caisse,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Caissesocialetypeemploye> li=em.createQuery("SELECT cs FROM Caissesocialetypeemploye cs WHERE"
                + " cs.caisseSociale.id=:caisse AND cs.typeEmploye.id=:typeemploye", Caissesocialetypeemploye.class)
                .setParameter("caisse", caisse)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("caissesociale/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findByCaisseSociale(@PathParam("id") Integer id) {
        List<Typeemploye> li=em.createQuery("SELECT cs.typeEmploye FROM Caissesocialetypeemploye cs WHERE cs.caisseSociale.id =:id", Typeemploye.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    
//    @GET
//    @Path("caissesociale/{id}")
//    @Produces({MediaType.APPLICATION_JSON})
//    public List<Caissesocialetypeemploye> findByCaisseSociale(@PathParam("id") Integer id) {
//        List<Caissesocialetypeemploye> li=em.createQuery("SELECT cs FROM Caissesocialetypeemploye cs WHERE cs.caisseSociale.id =:id", Caissesocialetypeemploye.class)
//                .setParameter("id", id)
//                .getResultList();
//        if(li.size()>0){
//            return li;
//        }
//        return null;
//    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Caissesocialetypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Caissesocialetypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
