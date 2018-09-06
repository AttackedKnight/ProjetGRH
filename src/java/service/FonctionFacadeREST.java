/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.HashMap;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import sn.auth.Authentification;
import sn.auth.Secured;
import sn.grh.Fonction;
import sn.grh.Utilisateur;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.fonction")
public class FonctionFacadeREST extends AbstractFacade<Fonction> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    
    @Context 
    private HttpServletRequest request;
    
    HashMap<String, Boolean> permissions;
    
    public FonctionFacadeREST() {
        super(Fonction.class); 
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Fonction entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Fonction entity) {
        super.edit(entity);
    }

    @Secured
    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
    
    @GET
    @Path("libelle/{libelle}")
    @Produces({MediaType.APPLICATION_JSON})
    public Fonction findFonction(@PathParam("libelle") String libelle) {
        List<Fonction> f =em.createQuery("SELECT f FROM Fonction f WHERE f.libelle = :libelle", Fonction.class)
                .setParameter("libelle", libelle)
                .getResultList();
        
        if(f.size()>0){
            System.err.println(f.get(0).getLibelle());
            return f.get(0);
        }
        return null;
    }

    @GET
    @Path("{id}")
    @Secured
    @Produces({MediaType.APPLICATION_JSON})
    public Fonction find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Fonction> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Fonction> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
