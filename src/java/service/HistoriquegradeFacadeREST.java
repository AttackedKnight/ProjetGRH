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
import sn.grh.Historiquegrade;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.historiquegrade")
public class HistoriquegradeFacadeREST extends AbstractFacade<Historiquegrade> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public HistoriquegradeFacadeREST() {
        super(Historiquegrade.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Historiquegrade entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Historiquegrade entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Historiquegrade find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findByEmploye(@PathParam("id") Integer id) {
        List<Historiquegrade> h=em.createQuery("SELECT h FROM  Historiquegrade h WHERE h.employe.id = :id ORDER BY h.id DESC", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
    
    /*ok*/
    
    /*RECUPERER LES INFORMATIONS SUR LES AVANCEMENTS DES EMPLOYES DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    
    @GET
    @Path("allavancement")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAllAvancement(){
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    @GET
    @Path("avancement/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancement(@PathParam("types") String types){
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1"
                + " AND h.employe.typeEmploye.id IN ("+types+")",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE DONNE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/genre{genre}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementFemme(@PathParam("types") String types,@PathParam("genre") Integer genre){
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 "
                + " AND h.employe.genre.id="+genre+" AND h.employe.typeEmploye.id IN ("+types+")",Historiquegrade.class).getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }

    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementEntite(@PathParam("id") Integer id,@PathParam("types") String types) {
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1 AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND s.finService = 0 AND s.employe.typeEmploye.id IN ("+types+"))", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }
    
    /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE DONNEE D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
    @GET
    @Path("avancement/entite/{id}/genre{genre}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Historiquegrade> findAvancementEntiteFemme(@PathParam("id") Integer id,
            @PathParam("types") String types,@PathParam("genre") Integer genre) {
        types=types.replace("-",",");
        List<Historiquegrade> h=em.createQuery("SELECT h FROM Historiquegrade h WHERE h.encours=1"
                + " AND h.employe.id IN (SELECT s.employe.id FROM Servir s WHERE s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.id="+genre+" AND"
                + " s.employe.typeEmploye.id IN ("+types+"))", Historiquegrade.class)
                .setParameter("id", id)
                .getResultList();
        if(h.size()>0){
            return h;
        }
        return null;
    }

    /*ok*/
    
    
}
