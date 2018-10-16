/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.auth;

import java.io.IOException;
import java.util.List;
import java.util.StringTokenizer;
import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import org.glassfish.jersey.internal.util.Base64;
import service.UtilisateurFacadeREST;

/**
 *
 * @author fallougalass
 */
@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class SecurityFilter implements ContainerRequestFilter{

    private static final String AUTHORIZATION_HEADER_KEY = "Authorization";
    private static final String AUTHORIZATION_HEADER_PREFIX = "Basic ";
    
    private UtilisateurFacadeREST utilisateurFacadeREST;
    public SecurityFilter(UtilisateurFacadeREST ut){
        this.utilisateurFacadeREST = ut;
    }
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
        System.out.println(">>>>>>>>>>>>>SECURITY FILTER APPELLE");
        if(authHeader != null && authHeader.size() > 0){
            String authToken = authHeader.get(0);
            authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
            String decodedString = Base64.decodeAsString(authToken);
            StringTokenizer tokenizer = new StringTokenizer (decodedString,":");
            String username = tokenizer.nextToken();
            String password = tokenizer.nextToken();
            System.out.println(">>>>>>>>>>>>>LOGIN "+username);
            if(utilisateurFacadeREST.estUtilisateur(username, password)){
                return;
            }
        }
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED).build());
        
    }
    
}