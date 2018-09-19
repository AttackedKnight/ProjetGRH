/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.metamodel.EntityType;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import sn.grh.Groupe;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.groupe")
public class GroupeFacadeREST extends AbstractFacade<Groupe> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public GroupeFacadeREST() {
        super(Groupe.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Groupe entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Groupe entity) {
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
    public Groupe find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    
    @GET
    @Path("libelle/{libelle}")
    @Produces({MediaType.APPLICATION_JSON})
    public Groupe findByLibelle(@PathParam("libelle") String libelle) {
        Groupe g=em.createQuery("SELECT g FROM Groupe g WHERE g.libelle = :libelle", Groupe.class)
                .setParameter("libelle", libelle)
                .getSingleResult();
        
        return g;
    }
    
    @GET
    @Path("/dernier")
    @Produces({MediaType.APPLICATION_JSON})
    public Groupe findLast() {
       List<Groupe> lg=em.createQuery("SELECT g FROM Groupe g ORDER BY g.id DESC", Groupe.class).getResultList();
           
       return lg.get(0);
    }
    

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Groupe> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("/tables")
    @Produces({MediaType.TEXT_PLAIN})
    public String getTable(){
        String tables="";
        for (EntityType<?> e : em.getMetamodel().getEntities()) {
            String entityTableName = e.getName();
            tables+=entityTableName+"-";
        }
        String fonctionnalitesSup="menuAdmin-menuDrh-menuEmploye-menuService-statistique";  //Gerer les permissions sur les fonctionnalites
        tables+=fonctionnalitesSup;
        
        tables=tables.toLowerCase();
        System.out.println(tables);
        
        return tables;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Groupe> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
