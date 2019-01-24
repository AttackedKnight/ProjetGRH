/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author fallougalass
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(service.AbsenceFacadeREST.class);
        resources.add(service.AbsencetypeemployeFacadeREST.class);
        resources.add(service.AccesgroupeFacadeREST.class);
        resources.add(service.AdresseFacadeREST.class);
        resources.add(service.AvoircompetenceFacadeREST.class);
        resources.add(service.CaissesocialeFacadeREST.class);
        resources.add(service.CaissesocialetypeemployeFacadeREST.class);
        resources.add(service.CategorieFacadeREST.class);
        resources.add(service.CiviliteFacadeREST.class);
        resources.add(service.ClasseFacadeREST.class);
        resources.add(service.ConjointFacadeREST.class);
        resources.add(service.ContactFacadeREST.class);
        resources.add(service.CorpsFacadeREST.class);
        resources.add(service.DocumentFacadeREST.class);
        resources.add(service.DomaineFacadeREST.class);
        resources.add(service.EchelonFacadeREST.class);
        resources.add(service.EmployeFacadeREST.class);
        resources.add(service.EnfantFacadeREST.class);
        resources.add(service.EntiteFacadeREST.class);
        resources.add(service.FonctionFacadeREST.class);
        resources.add(service.FonctionannexeFacadeREST.class);
        resources.add(service.FormationFacadeREST.class);
        resources.add(service.GenreFacadeREST.class);
        resources.add(service.GradeFacadeREST.class);
        resources.add(service.GradetypeemployeFacadeREST.class);
        resources.add(service.GroupeFacadeREST.class);
        resources.add(service.GroupetypeemployeFacadeREST.class);
        resources.add(service.HistoriquegradeFacadeREST.class);
        resources.add(service.InstitutionFacadeREST.class);
        resources.add(service.MembrecaissesocialeFacadeREST.class);
        resources.add(service.MembremutuelleFacadeREST.class);
        resources.add(service.MembresyndicatFacadeREST.class);
        resources.add(service.MutuellesanteFacadeREST.class);
        resources.add(service.MutuellesantetypeemployeFacadeREST.class);
        resources.add(service.NiveauFacadeREST.class);
        resources.add(service.ServirFacadeREST.class);
        resources.add(service.SituationmatrimonialeFacadeREST.class);
        resources.add(service.SyndicatFacadeREST.class);
        resources.add(service.SyndicattypeemployeFacadeREST.class);
        resources.add(service.TypeabsenceFacadeREST.class);
        resources.add(service.TypeautorisationFacadeREST.class);
        resources.add(service.TypeavancementFacadeREST.class);
        resources.add(service.TypecontratFacadeREST.class);
        resources.add(service.TypedocumentFacadeREST.class);
        resources.add(service.TypeemployeFacadeREST.class);
        resources.add(service.TypeentiteFacadeREST.class);
        resources.add(service.TypepermissionFacadeREST.class);
        resources.add(service.UtilisateurFacadeREST.class);
        resources.add(sn.auth.MyDynamicFeature.class);
    }
    
}
