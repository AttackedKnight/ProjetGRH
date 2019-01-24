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
import sn.grh.Membrecaissesociale;
import sn.otherclasse.StringBoolean;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.membrecaissesociale")
public class MembrecaissesocialeFacadeREST extends AbstractFacade<Membrecaissesociale> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public MembrecaissesocialeFacadeREST() {
        super(Membrecaissesociale.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Membrecaissesociale entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Membrecaissesociale entity) {
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
    public Membrecaissesociale find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Membrecaissesociale> findAll() {
        return super.findAll();
    }

    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Membrecaissesociale> findByEmploye(@PathParam("id") Integer id) {
        List<Membrecaissesociale> m=em.createQuery("SELECT m FROM Membrecaissesociale m WHERE m.employe.id = :id", Membrecaissesociale.class)
                .setParameter("id", id)
                .getResultList();
        if(m.size()>0){
             return m;
         }
         return null;
    }
    
    
    @GET
    @Path("employe/last/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Membrecaissesociale findLast(@PathParam("id") Integer id){
        List<Membrecaissesociale> h=em.createQuery("SELECT h FROM Membrecaissesociale h WHERE h.employe.id = :id ORDER BY h.id DESC",Membrecaissesociale.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h.get(0);
        }
        return null;
    }
    
    @GET
    @Path("checkmatriculecs/{matriculeCS}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean ExistingMatriculecs(@PathParam("matriculeCS") String matriculeCS) {
        List<Membrecaissesociale> e=em.createQuery("SELECT e FROM Membrecaissesociale e WHERE e.matriculeCaisseSociale = :matriculeCS", Membrecaissesociale.class)
                .setParameter("matriculeCS", matriculeCS)
                .getResultList();
        if(e.size()>0){
            return new StringBoolean(true);
        } 
        return new StringBoolean(false);
    }
    
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Membrecaissesociale> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
