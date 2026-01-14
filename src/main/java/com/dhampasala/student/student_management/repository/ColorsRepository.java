package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.Colors;
@Repository
public class ColorsRepository {
      public void addColors(Colors colors){
        Transaction tx=null;
        try(Session session= HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.persist(colors);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void updateColors(Colors colors){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.merge(colors);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void deleteColors(Colors colors){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(colors);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public Colors searchColors(String studentId){
        Transaction tx=null;
        try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            return session.find(Colors.class,studentId);
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        return null;
    }
    public List<Colors> getAll(){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            List<Colors> list=session.createQuery("FROM Colors", Colors.class).list();
            return list;
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
            return null;
        }
    }
}
