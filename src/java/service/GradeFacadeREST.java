/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
import sn.grh.Corps;
import sn.grh.Grade;
import sn.otherclasse.GradeByGroupe;
import sn.otherclasse.StringListString;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.grade")
public class GradeFacadeREST extends AbstractFacade<Grade> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public GradeFacadeREST() {
        super(Grade.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Grade entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Grade entity) {
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
    public Grade find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("distinctcorps")
    @Produces({MediaType.APPLICATION_JSON})
    public StringListString getCorps() {
        List<String> li=em.createQuery("SELECT DISTINCT g.corps.libelle FROM Grade g", String.class)
                .getResultList();
        if(li.size()>0){
            StringListString sli=new StringListString(li);
            return sli;
        }
        return null;
    }
    
    @GET
    @Path("distinctpatsclasse")
    @Produces({MediaType.APPLICATION_JSON})
    public StringListString getClasse() {
        List<String> li=em.createQuery("SELECT DISTINCT g.classe.libelle FROM Grade g WHERE g.corps IS NULL", String.class)
                .getResultList();
        if(li.size()>0){
            StringListString sli=new StringListString(li);
            return sli;
        }
        return null;
    }
    
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
    
    
    @GET
    @Path("nombre/{taille}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grade> findLast(@PathParam("taille") Integer taille) {
        List<Grade> li=em.createQuery("SELECT gt FROM Grade gt ORDER BY gt.id DESC", Grade.class).setMaxResults(taille)
                .getResultList();
        if(li.size()>0){
            return li;
        }
        return null;
    }
    

    @GET
    @Path("id/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Grade findById(@PathParam("id") Integer id) {
        List<Grade> li=em.createQuery("SELECT gt FROM Grade gt WHERE gt.id =:id", Grade.class)
                .setParameter("id", id)
                .getResultList();
        if(li.size()>0){
            return li.get(0);
        }
        return null;
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
