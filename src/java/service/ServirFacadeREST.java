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
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.employe.id=:id  AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
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
 /*Tous les employes d'un type donnee qui travaille(travaillaient)
    Utiliser pour les statistique sur les entrees sortie*/
    @GET
    @Path("typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findAllEmploye(@PathParam("types") String types) {
        types = types.replace("-", ",");
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE "
                + "s.employe.typeEmploye.id IN (" + types + ")", Servir.class)
                .getResultList();

        if (s.size() > 0) {
            return s;
        }
        return null;

    }

    @GET
    @Path("employeenservice/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmploye(@PathParam("types") String types) {
        types = types.replace("-", ",");
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.typeEmploye.id IN (" + types + ")", Servir.class)
                .getResultList();

        if (s.size() > 0) {
            return s;
        }
        return null;

    }

    @GET
    @Path("employeenservice/genre{genre}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeByGenre(@PathParam("types") String types, @PathParam("genre") Integer genre) {
        types = types.replace("-", ",");
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.genre.id = " + genre + " AND s.employe.typeEmploye.id IN (" + types + ")", Servir.class)
                .getResultList();
        if (s.size() > 0) {
            return s;
        }
        return null;

    }

    @GET
    @Path("entite/{id}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeEntite(@PathParam("id") Integer id, @PathParam("types") String types) {
        types = types.replace("-", ",");
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.typeEmploye.id IN (" + types + ")", Servir.class)
                .setParameter("id", id)
                .getResultList();

        if (s.size() > 0) {
            return s;
        }
        return null;

    }

    @GET
    @Path("entite/{id}/genre{genre}/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Servir> findEmployeEntiteByGenre(@PathParam("id") Integer id, @PathParam("types") String types, @PathParam("genre") Integer genre) {
        types = types.replace("-", ",");
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE  s.entite.id=:id AND"
                + " s.finService = 0 AND s.employe.genre.id= " + genre + " AND s.employe.typeEmploye.id IN (" + types + ")", Servir.class)
                .setParameter("id", id)
                .getResultList();

        if (s.size() > 0) {
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
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
            return s;
        }
        return null;
    }

    @GET
    @Path("fonction/employe/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public String findFonctionEmploye(@PathParam("id") Integer id) {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id AND s.fonction IS NOT NULL AND s.finService = 0 ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
            return s.get(0).getFonction().getLibelle();
        }
        return null;
    }

    @GET
    @Path("statut/employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public StringBoolean estPermanent(@PathParam("id") Integer id) {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id AND s.fonction IS NOT NULL AND s.finService = 0 ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
            if (s.get(0).getTypeContrat().getCode().equals("cdi")) {    //si c'est un permanent
                return new StringBoolean(true);
            }
        }
        return new StringBoolean(false);
    }

    
    @GET
    @Path("last/employe/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir findLastByEmploye(@PathParam("id") Integer id) {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.employe.id = :id AND  s.finService = 0 ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
            return s.get(0);
        }
        return null;
    }
    /*Connaitre l'actuel responsable d'une entite*/
    @GET
    @Path("responsable/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Servir findResponsableEntite(@PathParam("id") Integer id) {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.responsable=true AND s.finService = 0 ORDER BY s.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();

        if (s.size() > 0) {
            return s.get(0);
        }
        return null;

    }

    /*CONNAITRE L'EFFECTIF TOTAL DES EMPLOYES ACTIFS*/
    @GET
    @Path("effectif")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer countEmploye() {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE  s.finService = 0", Servir.class)
                .getResultList();
        if (s.size() > 0) {
            return s.size();
        } else {
            return 0;
        }

    }

    /*CONNAITRE L'EFFECTIF DES EMPLOYES D'UNE ENTITE*/
    @GET
    @Path("effectif/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Integer countEmployeEntite(@PathParam("id") Integer id) {
        List<Servir> s = em.createQuery("SELECT s FROM Servir s WHERE s.entite.id = :id AND s.finService = 0", Servir.class)
                .setParameter("id", id)
                .getResultList();
        if (s.size() > 0) {
            return s.size();
        } else {
            return 0;
        }

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
        List<Servir> s = em.createQuery("SELECT e FROM Servir e WHERE e.employe.id = :id AND e.fonction IS NOT NULL AND e.finService = 0 ORDER BY e.id DESC", Servir.class)
                .setParameter("id", id)
                .getResultList();

        if (s.size() > 0) {
            return s.get(0).getEntite();
        }
        return null;

    }

    /*Statitistique ok*/
    @GET
    @Path("onlyemployeenservice/typeemploye/{types}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Employe> findOnlyEmployeFromServir(@PathParam("types") String types) {      //Recupere juste la colonne employe
        types = types.replace("-", ",");
        List<Employe> s = em.createQuery("SELECT s.employe FROM Servir s WHERE s.finService = 0 "
                + "AND s.employe.typeEmploye.id IN (" + types + ")", Employe.class)
                .getResultList();

        if (s.size() > 0) {
            return s;
        }
        return null;

    }

    /*Statistique ok*/
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
