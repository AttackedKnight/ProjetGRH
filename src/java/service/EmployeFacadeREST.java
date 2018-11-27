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
import sn.otherclasse.StringBoolean;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.employe")
public class EmployeFacadeREST extends AbstractFacade<Employe> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    
    public EmployeFacadeREST() {
        super(Employe.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Employe entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Employe entity) {
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
    public Employe find(@PathParam("id") Integer id) {
        return super.find(id);
    }


    @GET
    @Path("nin/{numeroCni}")
    @Produces({MediaType.APPLICATION_JSON})
    public Employe findEmploye(@PathParam("numeroCni") String numeroCni) {
        Employe e=em.createQuery("SELECT e FROM Employe e WHERE e.numeroCni = :numeroCni", Employe.class)
                .setParameter("numeroCni", numeroCni)
                .getSingleResult();
        return e;
    }
    
    @GET
    @Path("checkcni/{numeroCni}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean ExistingCni(@PathParam("numeroCni") String numeroCni) {
        List<Employe> e=em.createQuery("SELECT e FROM Employe e WHERE e.numeroCni = :numeroCni", Employe.class)
                .setParameter("numeroCni", numeroCni)
                .getResultList();
        StringBoolean sb;
        if(e.size()>0){
            System.out.println("Entree");
            sb=new StringBoolean(true);
           return sb;
        }       
        sb=new StringBoolean(false);
        return sb;
    }
    @GET
    @Path("checkmatricule/{mat}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean ExistingMatricule(@PathParam("mat") String mat) {
        List<String> e=em.createQuery("SELECT e.matriculeInterne FROM Employe e WHERE e.matriculeInterne = :matricule", String.class)
                .setParameter("matricule", mat.replace("-", "/"))
                .getResultList();
        
        if(e.size()>0){
            return new StringBoolean(true);
        } 
        return new StringBoolean(false);
    }
    
    
    @GET
    @Path("checkmatriculecs/{matriculeCaisseSociale}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean ExistingMatriculecs(@PathParam("matriculeCaisseSociale") String matriculecs) {
        List<Employe> e=em.createQuery("SELECT e FROM Employe e WHERE e.matriculeCaisseSociale = :matriculeCaisseSociale", Employe.class)
                .setParameter("matriculeCaisseSociale", matriculecs)
                .getResultList();
        if(e.size()>0){
            return new StringBoolean(true);
        } 
        return new StringBoolean(false);
    }
    
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Employe> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Employe> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
