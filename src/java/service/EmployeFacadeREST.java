/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;


import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.json.JsonObject;
import javax.json.stream.JsonParser;
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
import sn.grh.Typeemploye;

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
    @Produces({MediaType.TEXT_PLAIN})
    public Boolean ExistingCni(@PathParam("numeroCni") String numeroCni) {
        List<Employe> e=em.createQuery("SELECT e FROM Employe e WHERE e.numeroCni = :numeroCni", Employe.class)
                .setParameter("numeroCni", numeroCni)
                .getResultList();
        if(e.size()>0){
            return true;
        }           
        return false;
    }
    @GET
    @Path("checkmatricule")
    @Produces({MediaType.TEXT_PLAIN})
    public String ExistingMatricule() {
        List<String> e=em.createQuery("SELECT e.matriculeInterne FROM Employe e", String.class)
                .getResultList();
        
        if(e.size()>0){
            return String.join("-",e);
        } 
        return null;
    }
    
    @GET
    @Path("countemploye")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmploye(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e", Employe.class).getResultList();
        return e.size();
    }
     @GET
    @Path("countemployepats")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployePATS(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PATS'", Employe.class).getResultList();
        return e.size();
    }
    @GET
    @Path("countemployeper")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployePER(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PER'", Employe.class).getResultList();
        return e.size();
    }
    
     @GET
    @Path("countemployehommespats")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeHommePATS(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PATS' AND e.sexe='masculin'", Employe.class).getResultList();
        return e.size();
    }
    @GET
    @Path("countemployehommesper")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeHommePER(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PER' AND e.sexe='masculin'", Employe.class).getResultList();
        return e.size();
    }
    
     @GET
    @Path("countemployefemmespats")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeFemmePATS(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PATS'  AND e.sexe='feminin'", Employe.class).getResultList();
        return e.size();
    }
    @GET
    @Path("countemployefemmesper")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeFemmePER(){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.typeEmploye.code='PER' AND e.sexe='feminin'", Employe.class).getResultList();
        return e.size();
    }
    
    @GET
    @Path("checkmatriculecs/{matriculeCaisseSociale}")
    @Produces({MediaType.TEXT_PLAIN})
    public Boolean ExistingMatriculecs(@PathParam("matriculeCaisseSociale") String matriculecs) {
        List<Employe> e=em.createQuery("SELECT e FROM Employe e WHERE e.matriculeCaisseSociale = :matriculeCaisseSociale", Employe.class)
                .setParameter("matriculeCaisseSociale", matriculecs)
                .getResultList();
        if(e.size()>0){
            return true;
        } 
        return false;
    }
    
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Employe> findAll() {
        return super.findAll();
    }

   
    
    @GET
    @Path("trancheage/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobal(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/homme/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobalHomme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='masculin'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/femme/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobalFemme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='feminin'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/homme/per/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePerHomme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='masculin' AND e.typeEmploye.code='PER'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/femme/per/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePerFemme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='feminin' AND e.typeEmploye.code='PER'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("trancheage/homme/pats/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePatsHomme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='masculin'  AND e.typeEmploye.code='PATS'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("trancheage/femme/pats/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePatsFemme(@PathParam("debut") String from,@PathParam("fin") String to) {
         System.out.println("je suis apple");
          
         List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateDeNaissance<'"+from+"' AND e.dateDeNaissance>'"+to+"' AND e.sexe='feminin'  AND e.typeEmploye.code='PATS'", Employe.class).getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("recrutement/{debut}/{fin}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer recrute(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin){
        List<Employe> e=em.createQuery("SELECT e FROM Employe e where e.dateRecrutement>'"+anneedebut+"' AND e.dateRecrutement<'"+anneefin+"'", Employe.class)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
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
