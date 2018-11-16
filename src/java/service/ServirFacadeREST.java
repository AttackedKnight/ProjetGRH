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
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import sn.otherclasse.StringBoolean;
import sn.grh.Employe;
import sn.grh.Servir;
import sn.grh.Entite;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.servir")
public class ServirFacadeREST extends AbstractFacade<Servir> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public ServirFacadeREST() {
        super(Servir.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Servir entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Servir entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("finservice/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void finirService(@PathParam("id") Integer id, Servir entity) {
        super.edit(entity);
    }
    
    /*Recuperer des informations sur un employe actif :pour afficher dossier*/
    @GET
    @Path("enservice/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean enservice(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.id=:id  AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0){
            return new StringBoolean(true);
        }
        return new StringBoolean(false);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    
    /*ok*/
    
    @GET
    @Path("employeenservice/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmploye(@PathParam("types") String types) {      
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    
    @GET
    @Path("employeenservice/femme/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeFemme(@PathParam("types") String types) {
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.genre.libelle='Féminin' AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .getResultList(); 
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("employeenservice/homme/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeHomme(@PathParam("types") String types) {
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.genre.libelle='Masculin' AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .getResultList(); 
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeEntite(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("femme/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeEntiteFemme(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.libelle='Féminin' AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("homme/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeEntiteHomme(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.libelle='Masculin' AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    /*ok*/
    
    /*Recuperer le parcours d'un employe : les entittes ou il a travaille*/
    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findByEmploye(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0){
            return s;
        }
        return null;
    }
    
    
    /*Connaitre l'actuel responsable d'une entite*/
    @GET
    @Path("responsable/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir findResponsableEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.responsable=true AND s.finService = 0 ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s.get(0);
        }
        return null;
        
    }
    
    /*CONNAITRE L'EFFECTIF DES EMPLOYES D'UNE ENTITE*/
    @GET
    @Path("effectif/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer countEmployeEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if(s.size()>0)
            return s.size();
        else
            return 0;
           
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findAll() {
        return super.findAll();
    }
    
    /*RECUPERER L'ENTITE OU TRAVAILLE ACTUELLEMENT UN EMPLOYE*/
    @GET
    @Path("entite/employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Entite findEntite(@PathParam("id") Integer id) {
        List<Servir> s=em.createQuery("SELECT e FROM Servir e WHERE e.employe.id = :id AND s.finService = 0 ORDER BY e.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        
        if(s.size()>0){
            return s.get(0).getEntite();
        }
        return null;
        
    }
    
    
    
    /*Statitistique ok*/
    @GET
    @Path("onlyemployeenservice/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Employe> findOnlyEmployeFromServir(@PathParam("types") String types) {      //Recupere juste la colonne employe
        types=types.replace("-", ",");
        List<Employe> s=em.createQuery("SELECT s.employe FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.typeEmploye.id IN ("+types+")", Employe.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    @GET
    @Path("all/onlyemployeenservice/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findAllFromServir(@PathParam("types") String types) {      //Recupere juste la colonne employe
        types=types.replace("-", ",");
        List<Servir> s=em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.typeEmploye.id IN ("+types+")", Servir.class)
                .getResultList();
        
        if(s.size()>0){
            return s;
        }
        return null;
           
    }
    
    /*Statistique par entite*/
    
    @GET
    @Path("countemploye/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeEntite(@PathParam("id") Integer id){      
        List<Servir> e=em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
     @GET
    @Path("countemployepats/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployePATSEntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where  s.employe.typeEmploye.code='PATS' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    @GET
    @Path("countemployeper/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployePEREntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.typeEmploye.code='PER' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
    @GET
    @Path("countemployehommes/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeHommeEntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.genre.libelle='Masculin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
    @GET
    @Path("countemployehommespats/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeHommePATSEntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.typeEmploye.code='PATS' AND s.employe.genre.libelle='Masculin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
    
    @GET
    @Path("countemployehommesper/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeHommePEREntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.typeEmploye.code='PER' AND s.employe.genre.libelle='Masculin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
    @GET
    @Path("countemployefemmes/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeFemmeEntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.genre.libelle='Féminin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
     @GET
    @Path("countemployefemmespats/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeFemmePATSEntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.typeEmploye.code='PATS'  AND s.employe.genre.libelle='Féminin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    @GET
    @Path("countemployefemmesper/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer NbreEmployeFemmePEREntite(@PathParam("id") Integer id){
        List<Servir> e=em.createQuery("SELECT s FROM Servir s  where s.employe.typeEmploye.code='PER' AND s.employe.genre.libelle='Féminin' AND s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        return e.size();
    }
    
    
    @GET
    @Path("trancheage/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobal(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/homme/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobalHomme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND  s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Masculin'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/femme/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgeGlobalFemme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND  s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Féminin'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/homme/per/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePerHomme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Masculin' AND s.employe.typeEmploye.code='PER'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("trancheage/femme/per/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePerFemme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Féminin' AND s.employe.typeEmploye.code='PER'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("trancheage/homme/pats/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePatsHomme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Masculin'  AND s.employe.typeEmploye.code='PATS'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("trancheage/femme/pats/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer trancheAgePatsFemme(@PathParam("debut") String from,@PathParam("fin") String to, @PathParam("id") Integer id) {
        
          
         List<Servir> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.finService = 0 AND s.employe.dateDeNaissance<'"+from+"' AND s.employe.dateDeNaissance>'"+to+"' AND s.employe.genre.libelle='Féminin'  AND s.employe.typeEmploye.code='PATS'", Servir.class)
                 .setParameter("id", id)
                 .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    /*  LES ENTREES PAR ANNEE POUR UN ENTITE*/
    
    @GET
    @Path("recrutement/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterEntrees(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.debut>'"+anneedebut+"' AND s.debut<'"+anneefin+"'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("recrutement/per/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterEntreesPer(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.debut>'"+anneedebut+"' AND s.debut<'"+anneefin+"' and s.employe.typeEmploye.code='PER'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("recrutement/pats/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterEntreesPats(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.debut>'"+anneedebut+"' AND s.debut<'"+anneefin+"' and s.employe.typeEmploye.code='PATS'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    /*  LES ENTREES PAR ANNEE POUR UN ENTITE*/
    
    /*  LES SORTIES PAR ANNEE POUR UN ENTITE*/
    
    @GET
    @Path("sortie/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterSortie(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.fin>'"+anneedebut+"' AND s.fin<'"+anneefin+"'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    @GET
    @Path("sortie/per/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterSortiePer(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.fin>'"+anneedebut+"' AND s.fin<'"+anneefin+"' and s.employe.typeEmploye.code='PER'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("sortie/pats/{debut}/{fin}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer compterSortiePats(@PathParam("debut") String anneedebut,@PathParam("fin") String anneefin, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT s FROM Servir s where s.entite.id=:id AND s.fin>'"+anneedebut+"' AND s.fin<'"+anneefin+"' and s.employe.typeEmploye.code='PATS'", Employe.class)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    /*  LES SORTIES PAR ANNEE POUR UN ENTITE*/
    
    
    @GET
    @Path("pats/classe/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsParClasse(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g,Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("pats/homme/classe/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsHommeParClasse(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g, Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Masculin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("pats/femme/classe/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePatsFemmeParClasse(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g, Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.classe.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Féminin' AND g.employe.typeEmploye.code='PATS' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("per/corps/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerParCorps(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g, Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }

    @GET
    @Path("per/homme/corps/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerHommeParCorps(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g, Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Masculin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    @GET
    @Path("per/femme/corps/{libelle}/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer comptePerFemmeParCorps(@PathParam("libelle") String libelle, @PathParam("id") Integer id){
        List<Employe> e=em.createQuery("SELECT DISTINCT g.employe FROM Historiquegrade g, Servir s WHERE g.employe=s.employe AND s.entite.id=:id AND s.finService = 0 AND g.grade.corps.libelle=:libelle AND g.encours=1 AND g.employe.genre.libelle='Féminin' AND g.employe.typeEmploye.code='PER' ORDER BY g.id DESC", Employe.class)
                .setParameter("libelle", libelle)
                .setParameter("id", id)
                .getResultList();
        if(e.size()>0){
            return e.size();
        }
        return 0;
    }
    
    
    /*Statistique par entite*/
    
    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
