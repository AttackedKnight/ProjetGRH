/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.upload;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;

import org.json.JSONObject;

/**
 *
 * @author fallougalass
 */
@WebServlet(name = "DeleteFileServlet", urlPatterns = {"/DeleteFileServlet"})
public class DeleteFileServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {
        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        
        JSONObject jObj;
        try {            
            jObj = new JSONObject(sb.toString());
            String chemin = jObj.getString("chemin");
        
            chemin = chemin.replace("/", "\\");

            /*En local*/
//            File fichier = new File(getServletContext().getRealPath(""));
//            String racine = (new File(fichier.getParent())).getParent();
//            File f = new File(racine + "\\web\\" + chemin);

            /*Sur serveur*/
            File fichier=new File(getServletContext().getRealPath(""));
            String racine=(new File(fichier.getParent())).getParent();;
            File f=new File(fichier.getAbsolutePath()+File.separator+""+chemin);



            System.out.println("*************CHEMIN : " + racine+"\\web\\" + chemin);

            if(f.exists()){
                if (f.isDirectory()) {  /*Si c'est un repertoire*/
                    /*Supprimer les fichiers du repertoire d'abord*/
                    File[] elements = f.listFiles();
                    for (int i = 0; i < elements.length; i++) {
                        elements[i].delete();
                    }

                }
                f.delete();
                out.println("Suppression effectué");
            }
            else{
                out.println("Fichier ou dossier inexistant");
            }
        } catch (Exception e) {
            System.out.println("Erreur de conversion de l'objet passé en paramétre\n");
            e.printStackTrace();
            out.println("Chemin invalid");
        }
       
        

        
        
//        try {            
//            f.delete();
//            out.println("ok");
//        } catch (Exception x) {
//            out.println("error");
//        }
        
//        Path path = f.toPath();
//
//        try {
//            Files.delete(path);
//            out.println("Suppresion effectuée avec succes");
//        } catch (NoSuchFileException x) {
//            out.println("Fichier ou dossier inexistant");
//        } catch (DirectoryNotEmptyException x) {
//            out.println("Dossier non vide"); 
//        } catch (IOException x) {
//            // File permission problems are caught here.
//            out.println("Vous n'avez pas la permission de supprimer cet élement");
//        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(DeleteFileServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (JSONException ex) {
            Logger.getLogger(DeleteFileServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
