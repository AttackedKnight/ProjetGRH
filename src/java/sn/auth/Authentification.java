/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.auth;

import java.util.HashMap;
import javax.ejb.Stateless;
import javax.servlet.http.HttpSession;
import sn.grh.Utilisateur;

/**
 *
 * @author fallougalass
 */
@Stateless
public class Authentification {

//    private static HttpSession maSession = null;
    private static HttpSession maSession;

    public Authentification() {
        System.out.println("Authentification instanciée");
    }

    public static void setSession(HttpSession session) {
        maSession = session;
    }

    public static void setData(String cle, Object valeur) {
        if(valeur !=null)
            maSession.setAttribute(cle, valeur);
        else
            maSession.setAttribute(cle, null);
    }

    public static Object getData(String cle) {
        if (sessionExist()) {
            try {
                return maSession.getAttribute(cle);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    
    public static boolean getPermission(String nomTable,String operation) {
        
        if (sessionExist()) {
            try {
                return ((HashMap<String,Boolean>)maSession.getAttribute(nomTable)).get(operation);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public static boolean sessionExist() {
//        if (maSession !=null) {
            try{
                Utilisateur u=(Utilisateur)maSession.getAttribute("user");
                return true;
            } catch (Exception e) {
                return false;

            }
//        }
//        return false;
    }

    public static boolean sessionDestroy() {
        if (sessionExist()) {
            try {
//                maSession.setAttribute("user", null);
                maSession.invalidate();
//                maSession=null;
                return true;
            } catch (Exception e) {
                e.printStackTrace();

            }

        }
        return false;
    }
}
