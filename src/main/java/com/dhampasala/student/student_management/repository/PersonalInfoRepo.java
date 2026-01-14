package com.dhampasala.student.student_management.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.dhampasala.student.student_management.HibernateUtil;
import com.dhampasala.student.student_management.model.entity.PersonalInfo;
@Repository
public class PersonalInfoRepo {
      public void addPersonalInfo(PersonalInfo personalInfo){
        Transaction tx=null;
        try(Session session= HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.persist(personalInfo);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void updatePersonalInfo(PersonalInfo personalInfo){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            session.merge(personalInfo);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public void deletePersonalInfo(PersonalInfo personalInfo){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx = session.beginTransaction();
            session.remove(personalInfo);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
    }
    public PersonalInfo searchPersonalInfo(String studentId){
        Transaction tx=null;
        try (Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            return session.find(PersonalInfo.class,studentId);
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
        }
        return null;
    }
    public List<PersonalInfo> getAll(){
        Transaction tx=null;
        try(Session session=HibernateUtil.getSingleton().getSessionFactory().openSession()){
            tx=session.beginTransaction();
            List<PersonalInfo> list=session.createQuery("FROM PersonalInfo", PersonalInfo.class).list();
            return list;
        } catch (Exception e) {
            if(tx!=null){
                tx.rollback();
            }
            return null;
        }
    }
}
