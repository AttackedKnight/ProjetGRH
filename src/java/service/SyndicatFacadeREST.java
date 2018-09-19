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

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.syndicat")
public class SyndicatFacadeREST extends AbstractFacade<Syndicat> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public SyndicatFacadeREST() {
        super(Syndicat.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Syndicat entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Syndicat entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("libelle/{lib}")
    @Produces({MediaType.APPLICATION_JSON})
    public Syndicat findByLibelle(@PathParam("lib") String lib) {
        List<Syndicat> li=em.createQuery("SELECT sy FROM Syndicat sy WHERE sy.nomSyndicat =:libelle", Syndicat.class)
                .setParameter("libelle", lib)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }    
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Syndicat find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicat> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("pats")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicat> findAllPats() {
        List<Syndicat> s=em.createQuery("SELECT s FROM Syndicat s WHERE s.nomSyndicat = 'SATUC' OR s.nomSyndicat = 'STESU'", Syndicat.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
    }
    
    @GET
    @Path("per")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicat> findAllPer() {
        List<Syndicat> s=em.createQuery("SELECT s FROM Syndicat s WHERE s.nomSyndicat = 'SAES' OR s.nomSyndicat = 'SUDES'", Syndicat.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Syndicat> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
