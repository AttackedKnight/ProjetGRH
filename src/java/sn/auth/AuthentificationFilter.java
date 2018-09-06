/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.auth;

import java.io.IOException;
import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author fallougalass
 */
@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthentificationFilter implements ContainerRequestFilter{

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        System.out.println("***************FILTRE APPELE*******************");
        System.out.println("***************METHOD :"+ requestContext.getMethod());
        if(!Authentification.sessionExist()){
            System.out.println("***************session inexistante ou expiree*******************");         
            requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED).build());
            
           return;
        }
        System.out.println("***************session ok*******************");
    }
    
}
