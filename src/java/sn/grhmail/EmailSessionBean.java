/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.grhmail;

import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.util.Date;
import java.util.Properties;
import javax.ejb.Stateless;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author fallougalass
 */
@Stateless
public class EmailSessionBean {

     /*En production*/
    
//    private int port = 1025;
//    private String host = "10.157.20.203";
//    private String from = "10.157.20.203";
//
//    private boolean auth = true;
////    private String username = "root";
////    private String password = "fallou06";
//    private Protocol protocol = Protocol.SMTP;
//    private boolean debug = true;
    
    
     /*En local*/
    
    private int port = 1025;   
    private String host = "localhost";
    private String from = "user.name@host";
    private boolean auth = true;
    private String username = "root";
    private String password = "fallou06";
    private Protocol protocol = Protocol.SMTP;
    private boolean debug = true;
    
    
    private final static String MAILER_VERSION = "Java";
    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    public boolean sendEmail(String to, String  subject, String body){
        
        Properties props = System.getProperties();
        
//        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);
        switch (protocol) {
            case SMTPS:
                props.put("mail.smtp.ssl.enable", true);
                break;
            case TLS:
                props.put("mail.smtp.starttls.enable", true);
                break;
        }
//        Authenticator authenticator = null;
//        if (auth) {
//            props.put("mail.smtp.auth", true);
//            authenticator = new Authenticator() {
//                private PasswordAuthentication pa = new PasswordAuthentication(username, password);
//                @Override
//                public PasswordAuthentication getPasswordAuthentication() {
//                    return pa;
//                }
//            };
//        }
        Session session = Session.getInstance(props, null);
        session.setDebug(debug);
        
        MimeMessage message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] address = {new InternetAddress(to)};
            message.setRecipients(Message.RecipientType.TO, address);
            message.setSubject(subject);
            message.setHeader("X-Mailer", MAILER_VERSION);
            message.setSentDate(new Date());
            message.setText(body);
            Transport.send(message);
            
            return true;
//            System.out.println("Email envoyé");
        } catch (MessagingException ex) {
            ex.printStackTrace();
            return false;
        }
        
    }
}
