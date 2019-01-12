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
import sn.grh.Absence;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.absence")
public class AbsenceFacadeREST extends AbstractFacade<Absence> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public AbsenceFacadeREST() {
        super(Absence.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Absence entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Absence entity) {
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
    public Absence find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("entite/{ids}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findByEntite(@PathParam("ids") String ids) {
        ids=ids.replace("-", ",");
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.employe.id IN "
                + "(SELECT s.employe.id FROM Servir s WHERE s.entite.id IN("+ids+")  AND s.finService = 0)", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }
    
    @GET
    @Path("acceptee/entite/{ids}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findAccepteeByEntite(@PathParam("ids") String ids) {
        ids=ids.replace("-", ",");
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.etatTraitement = 1 AND ab.employe.id IN "
                + "(SELECT s.employe.id FROM Servir s WHERE s.entite.id IN("+ids+")  AND s.finService = 0)", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }
    
    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findByEmploye(@PathParam("id") Integer id) {
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.employe.id = "+id+"", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }
    
    @GET
    @Path("acceptee/employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findAbsenceAccepteeByEmploye(@PathParam("id") Integer id) {
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.employe.id = "+id+" AND ab.etatTraitement = 1", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }

    @GET
    @Path("dernierconge/employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Absence findLastCongeByEmploye(@PathParam("id") Integer id) {
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.typeAbsence.code = 'cong' AND ab.etatTraitement = 1"
                + " AND ab.employe.id = "+id+" ORDER BY ab.id DESC", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("absencedeductible/employe/{id}/datereference/{date}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findAbsenceDeductibleByEmploye(@PathParam("id") Integer id,@PathParam("date") String dateRef) {
        List<Absence> li = em.createQuery("SELECT ab FROM Absence ab WHERE ab.typeAutorisation.libelle = 'Deductible'"
                + " AND ab.dateDebut > "+dateRef+" AND  ab.etatTraitement = 1 AND ab.employe.id = "+id+" "
                        + "ORDER BY ab.id DESC", Absence.class)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absence> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
