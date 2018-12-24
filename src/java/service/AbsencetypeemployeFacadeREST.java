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
import sn.grh.Absencetypeemploye;
import sn.grh.Typeabsence;
import sn.grh.Typeemploye;

/**
 *
 * @author Baba Mbengue
 */
@Stateless
@Path("sn.grh.absencetypeemploye")
public class AbsencetypeemployeFacadeREST extends AbstractFacade<Absencetypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public AbsencetypeemployeFacadeREST() {
        super(Absencetypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Absencetypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Absencetypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @DELETE
    @Path("typeabsence/{typeabsence}/typeemploye/{typeemploye}")
    public void remove(@PathParam("typeabsence") Integer typeabsence, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findByAbsenceAndTypeEmploye(typeabsence, typeemploye));
    }

    @GET
    @Path("typeabsence/{typeabsence}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Absencetypeemploye findByAbsenceAndTypeEmploye(@PathParam("typeabsence") Integer typeabsence,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Absencetypeemploye> li = em.createQuery("SELECT sy FROM Absencetypeemploye sy WHERE"
                + " sy.typeAbsence.id=:typeabsence AND sy.typeEmploye.id=:typeemploye", Absencetypeemploye.class)
                .setParameter("typeabsence", typeabsence)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if (li.size() > 0) {
            return li.get(0);
        }
        return null;
    }

    @GET
    @Path("absence/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findByAbsence(@PathParam(value = "id") Integer id) {
        List<Typeemploye> li = em.createQuery("SELECT ty.typeEmploye FROM Absencetypeemploye ty WHERE ty.typeAbsence.id =:id", Typeemploye.class)
                .setParameter("id", id)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }

    @GET
    @Path("type/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeabsence> findByType(@PathParam("id") Integer id) {
        List<Typeabsence> li = em.createQuery("SELECT ty.typeAbsence FROM Absencetypeemploye ty WHERE ty.typeEmploye.id =:id", Typeabsence.class)
                .setParameter("id", id)
                .getResultList();
        if (li.size() > 0) {
            return li;
        }
        return null;
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Absencetypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absencetypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Absencetypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
