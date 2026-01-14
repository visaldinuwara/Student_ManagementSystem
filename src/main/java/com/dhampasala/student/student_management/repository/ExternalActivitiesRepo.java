package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.ExternalActivities;
@Repository
public class ExternalActivitiesRepo {
      public void addExternalActivity(ExternalActivities externalActivities){
        Transaction tx=null;
        try(Session session= HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.persist(externalActivities);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void updateExternalActivity(ExternalActivities externalActivities){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.merge(externalActivities);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void deleteExternalActivity(ExternalActivities externalActivities){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(externalActivities);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public ExternalActivities searchExternalActivity(String studentId){
        Transaction tx=null;
        try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            return session.find(ExternalActivities.class,studentId);
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        return null;
    }
    public List<ExternalActivities> getAll(){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            List<ExternalActivities> list=session.createQuery("FROM ExternalActivities", ExternalActivities.class).list();
            return list;
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
            return null;
        }
    }
}
