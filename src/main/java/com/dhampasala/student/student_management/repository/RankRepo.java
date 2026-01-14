package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.Rank;
@Repository
public class RankRepo {
      public void addRank(Rank rank){
        Transaction tx=null;
        try(Session session= HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.persist(rank);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void updateRank(Rank rank){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.merge(rank);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void deleteRank(Rank rank){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(rank);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public Rank searchRank(String studentId){
        Transaction tx=null;
        try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            return session.find(Rank.class,studentId);
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        return null;
    }
    public List<Rank> getAll(){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            List<Rank> list=session.createQuery("FROM Rank", Rank.class).list();
            return list;
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
            return null;
        }
    }
}
