/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.auth;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.StringTokenizer;
import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import org.glassfish.jersey.internal.util.Base64;
import service.UtilisateurFacadeREST;

/**
 *
 * @author fallougalass
 */
@Provider
public class MyDynamicFeature implements DynamicFeature {

    

    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context) {
        final String resourcePackage = resourceInfo.getResourceClass()
                .getPackage().getName();
        final Method resourceMethod = resourceInfo.getResourceMethod();

        if ("service".equals(resourcePackage) && (resourceMethod.getAnnotation(GET.class) != null
                || resourceMethod.getAnnotation(POST.class) != null || resourceMethod.getAnnotation(DELETE.class) != null
                || resourceMethod.getAnnotation(PUT.class) != null)
                && !resourceMethod.getName().equals("login")) {
//            System.out.println(utilisateurFacadeREST);
            context.register(new MyAuthFilter(utilisateurFacadeREST));
        }
    }

    @Inject
    UtilisateurFacadeREST utilisateurFacadeREST;
    
    @Priority(Priorities.AUTHENTICATION)
    public static class MyAuthFilter implements ContainerRequestFilter {

        private static final String AUTHORIZATION_HEADER_KEY = "Authorization";
        private static final String AUTHORIZATION_HEADER_PREFIX = "Basic ";

        private static  UtilisateurFacadeREST utilisateurFacadeREST;
//
        public MyAuthFilter(UtilisateurFacadeREST ut) {
            this.utilisateurFacadeREST = ut;
        }
        
        
        @Override
        public void filter(ContainerRequestContext requestContext) throws IOException {
            List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
            System.out.println(">>>>>>>>>>>>>SECURITY FILTER APPELLE");
            if (authHeader != null && authHeader.size() > 0) {
                String authToken = authHeader.get(0);
                authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
                String decodedString = Base64.decodeAsString(authToken);
                StringTokenizer tokenizer = new StringTokenizer(decodedString, ":");
                String username = tokenizer.nextToken();
                String password = tokenizer.nextToken();
                System.out.println(">>>>>>>>>>>>>LOGIN " + username);
                if (utilisateurFacadeREST.estUtilisateur(username, password)) {
                    return;
                }
            }
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED).build());

        }

    }

}
