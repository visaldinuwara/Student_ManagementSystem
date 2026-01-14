package com.dhampasala.student.student_management;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
public class HibernateUtil {
  private static HibernateUtil hibernateUtil;
    private final SessionFactory sessionFactory=buildSessionFactory();

    private SessionFactory buildSessionFactory() {
        try {
            return new Configuration().configure().buildSessionFactory();
        } catch (HibernateException e) {
            System.out.println("SessionFactory Build Failed");
        }
        return null;
    }
    public static HibernateUtil getSingleton(){
        if(hibernateUtil==null){
            hibernateUtil=new HibernateUtil();
            return hibernateUtil;
        }
        return hibernateUtil;
    }
    public SessionFactory getSessionFactory(){
        return sessionFactory;
    }
}
