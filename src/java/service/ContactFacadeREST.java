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
import sn.grh.Contact;
import sn.otherclasse.StringBoolean;

/**
 *
 * @author fallougalass
 */
@Stateless
@Path("sn.grh.contact")
public class ContactFacadeREST extends AbstractFacade<Contact> {

    @PersistenceContext(unitName = "ProjetGRHPU")
    private EntityManager em;

    public ContactFacadeREST() {
        super(Contact.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Contact entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Contact entity) {
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
    public Contact find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Path("employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Contact findByEmploye(@PathParam("id") Integer id) {
        List<Contact> m=em.createQuery("SELECT c FROM Contact c WHERE c.employe.id = :id", Contact.class)
                .setParameter("id", id)
                 .getResultList();
         
         if(m.size()>0){
             return m.get(0);
         }
         return null;
    }
    
    @GET
    @Path("checknum/{numero1}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean Existingcontact(@PathParam("numero1") String num1) {
        List<Contact> m=em.createQuery("SELECT c FROM Contact c WHERE c.numero1 = :numero1 OR c.numero2 = :numero1", Contact.class)
                .setParameter("numero1", num1)
                 .getResultList();
         
         if(m.size()>0){
             return new StringBoolean(true);
         }
         return new StringBoolean(false);
    }
       
    @GET
    @Path("checkmail/{email}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean Existingmail(@PathParam("email") String email) {
        List<Contact> m=em.createQuery("SELECT c FROM Contact c WHERE c.email = :email", Contact.class)
                .setParameter("email", email)
                 .getResultList();
         
         if(m.size()>0){
             return new StringBoolean(true);
         }
         return new StringBoolean(false);
    }
    
    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Contact> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Contact> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
