/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.upload;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;




import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author fallougalass
 * 
 * Gere l'upload des document(archivage) :
 * repertoire de sauvegarde=dossier "archive/cni proprietaire document" : cree s'il n'existe pas
 * 
 */
@WebServlet(name = "UploadFileServlet", urlPatterns = {"/UploadFileServlet"})
public class UploadFileServlet extends HttpServlet {

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
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        
        
   
		PrintWriter out = response.getWriter();

		boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);
		if (!isMultipartContent) {
			out.println("You are not trying to upload");
			return;
		}
		
                // Create a factory for disk-based file items
                DiskFileItemFactory factory = new DiskFileItemFactory();

                // Set factory constraints
                factory.setSizeThreshold(1048576);

       
                /*En local*/
                File fichier=new File(getServletContext().getRealPath(""));
                String racine=(new File(fichier.getParent())).getParent();
                System.out.println("Ceci est le context "+(new File(fichier.getParent())).getParent());
                File f=new File(racine+"\\web\\archives");

                factory.setRepository(f);

                /*Sur serveur*/
            
//             File fichier=new File(getServletContext().getRealPath(""));
//                String racine=(new File(fichier.getParent())).getParent();
//                File f=new File(fichier.getAbsolutePath()+File.separator+"archives");
//
//                factory.setRepository(f);

                // Create a new file upload handler
                ServletFileUpload upload = new ServletFileUpload(factory);

                // Set overall request size constraint
                upload.setSizeMax(524288000);

		try {
			List<FileItem> fields = upload.parseRequest(request);
			Iterator<FileItem> it = fields.iterator();
			if (!it.hasNext()) {
				out.println("Le fichier n'existe pas");
				return;
			}
			while (it.hasNext()) {
				FileItem fileItem = it.next();
				boolean isFormField = fileItem.isFormField();
                                if (!isFormField){
                                    
                                    File emplacement=new File(factory.getRepository()+File.separator+fileItem.getFieldName());
                                    //Verifier qu'un repertoire a ete cree pour l'employe  : sinon en cree: le repertoire a comme nom son num CNI  
                                    if(!emplacement.exists()){
                                        emplacement.mkdir();
                                    }
                                    
                                    factory.setRepository(emplacement);
                                    String nomDuFichier=(fileItem.getName()).replaceAll("[^a-zA-Z0-9.-]", "_");             //Remplacer les caracteres invalid par _
                                    File uploadedFile = new File(factory.getRepository()+File.separator+nomDuFichier);
                                    
                                    fileItem.write(uploadedFile);
                                    
                                    String chemin="archives/"+fileItem.getFieldName()+"/"+nomDuFichier;
                                    out.print(chemin);
//                                    out.println(chemin);

				}
				
			}
			
		} catch (FileUploadException e) {
			e.printStackTrace();
                        out.println("Une erreur est survenue lors de l'envoi du fichier");
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
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(UploadFileServlet.class.getName()).log(Level.SEVERE, null, ex);
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
        } catch (Exception ex) {
            Logger.getLogger(UploadFileServlet.class.getName()).log(Level.SEVERE, null, ex);
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
