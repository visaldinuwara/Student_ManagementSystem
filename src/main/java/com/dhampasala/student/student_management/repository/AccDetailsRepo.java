package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.AccDetails;

@Repository
public class AccDetailsRepo {
      public void addAccDetails(AccDetails accDetails){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()) {
            tx=session.beginTransaction();
            session.persist(accDetails);
            tx.commit();
        } catch (Exception e) {
            if(tx != null){
                tx.rollback();
            }
        }
    }
    public void updateAccDetails(AccDetails accDetails) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSingleton().getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.merge(accDetails.getUserName());
            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
        }
    }
    public void deleteAccDetails(AccDetails accDetails){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(accDetails);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        }
        public AccDetails searchAccDetails(String userName){
            Transaction tx=null;
            try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
                tx=session.beginTransaction();
                return session.find(AccDetails.class,userName);
            } catch (Exception e) {
                if(tx!=null){
                    tx.rollback();
                }
            }
            return null;
        }
        public List<AccDetails> getAll(){
            Transaction tx=null;
            try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
                tx=session.beginTransaction();
                List<AccDetails> list=session.createQuery("FROM AccDetails", AccDetails.class).list();
                return list;
            } catch (Exception e) {
                if(tx!=null){
                    tx.rollback();
                }
                return null;
            }
        }
}
