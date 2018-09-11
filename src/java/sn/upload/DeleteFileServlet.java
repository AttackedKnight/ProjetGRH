/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.upload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        String chemin = request.getParameter("chemin");
        chemin = chemin.replace("/", "\\");

        /*En local*/
        File fichier = new File(getServletContext().getRealPath(""));
        String racine = (new File(fichier.getParent())).getParent();
        File f = new File(racine + "\\web\\" + chemin);

        /*Sur serveur*/
//        File fichier=new File(getServletContext().getRealPath(""));
//        String racine=(new File(fichier.getParent())).getParent();;
//        File f=new File(fichier.getAbsolutePath()+File.separator+""+chemin);

        System.out.println(racine + "\\web\\" + chemin);

        System.out.println("*************CHEMIN : " + chemin);

        if (f.isDirectory()) {
            File[] elements = f.listFiles();
            for (int i = 0; i < elements.length; i++) {
                elements[i].delete();
            }

        }
        Path path = f.toPath();

        try {
            Files.delete(path);
            out.println("Suppresion effectuée avec succes");
        } catch (NoSuchFileException x) {
            out.println("Fichier ou dossier inexistant");
        } catch (DirectoryNotEmptyException x) {
            out.println("Dossier non vide"); 
        } catch (IOException x) {
            // File permission problems are caught here.
            out.println("Vous n'avez pas la permission de supprimer cet élement");
        }
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
        processRequest(request, response);
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
        processRequest(request, response);
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
