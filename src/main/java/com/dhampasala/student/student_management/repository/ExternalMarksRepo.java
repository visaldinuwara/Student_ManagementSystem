package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.ExternalMarks;
@Repository
public class ExternalMarksRepo {
      public void addExternalMark(ExternalMarks externalMarks){
        Transaction tx=null;
        try(Session session= HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.persist(externalMarks);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void updateExternalMark(ExternalMarks externalMarks){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.merge(externalMarks);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void deleteExternalMark(ExternalMarks externalMarks){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(externalMarks);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public ExternalMarks searchExternalMarks(String studentId){
        Transaction tx=null;
        try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            return session.find(ExternalMarks.class,studentId);
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        return null;
    }
    public List<ExternalMarks> getAll(){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            List<ExternalMarks> list=session.createQuery("FROM ExternalMarks", ExternalMarks.class).list();
            return list;
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
            return null;
        }
    }
}
