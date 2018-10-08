/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.auth;

import java.lang.reflect.Method;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.container.DynamicFeature;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author fallougalass
 */
@Provider
public class MyDynamicFeature implements DynamicFeature{

    @Override
    public void configure(ResourceInfo resourceInfo, FeatureContext context) {
        final String resourcePackage = resourceInfo.getResourceClass()
                .getPackage().getName();
        final Method resourceMethod = resourceInfo.getResourceMethod();
        
        if ("service".equals(resourcePackage) && (resourceMethod.getAnnotation(GET.class) != null ||
                resourceMethod.getAnnotation(POST.class) != null || resourceMethod.getAnnotation(DELETE.class) != null
                || resourceMethod.getAnnotation(PUT.class) != null) &&
                !resourceMethod.getName().equals("login") && !resourceMethod.getName().equals("logout")
                && !resourceMethod.getName().equals("sessionExpire")) {
            context.register(AuthentificationFilter.class);
        }
    }
    
}
