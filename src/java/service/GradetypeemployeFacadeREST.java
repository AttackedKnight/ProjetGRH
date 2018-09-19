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
import sn.grh.Gradetypeemploye;
import sn.grh.Grade;
import sn.grh.Typeemploye;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.gradetypeemploye")
public class GradetypeemployeFacadeREST extends AbstractFacade<Gradetypeemploye> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public GradetypeemployeFacadeREST() {
        super(Gradetypeemploye.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Gradetypeemploye entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Gradetypeemploye entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
    
     @DELETE
    @Path("grade/{grade}/typeemploye/{typeemploye}")
    public void remove(@PathParam("grade") Integer grade, @PathParam("typeemploye") Integer typeemploye) {
        super.remove(findByGradeAndTypeEmploye(grade,typeemploye));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Gradetypeemploye find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Gradetypeemploye> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Gradetypeemploye> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @GET
    @Path("grade/{grade}/typeemploye/{typeemploye}")
    @Produces({MediaType.APPLICATION_JSON})
    public Gradetypeemploye findByGradeAndTypeEmploye(@PathParam("grade") Integer grade,
            @PathParam("typeemploye") Integer typeemploye) {
        List<Gradetypeemploye> li=em.createQuery("SELECT gt FROM Gradetypeemploye gt WHERE"
                + " gt.grade.id=:grade AND gt.typeEmploye.id=:typeemploye", Gradetypeemploye.class)
                .setParameter("grade", grade)
                .setParameter("typeemploye", typeemploye)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
    }
    
    @GET
    @Path("grade/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Typeemploye> findByGrade(@PathParam("id") Integer id) {
        List<Typeemploye> li=em.createQuery("SELECT gt.typeEmploye FROM Gradetypeemploye gt WHERE gt.grade.id =:id", Typeemploye.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    
    
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
