package org.itmo.secs;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
import org.itmo.secs.area.Area;
import org.itmo.secs.area.figure.*;

import java.io.Serializable;
import java.util.List;

@Named
@ApplicationScoped
public class DataBaseServiceBean implements Serializable {
    private final EntityManager entityManager = Persistence.createEntityManagerFactory("my-app").createEntityManager();

    private final Figure area;

    {
        area = new Area(
                new Rectangle(1.0, 1.0),
                new Rhombus(0.5, 0.5),
                new Circle(1.0),
                new Empty()
        );
    }

    public List<PointData> getAllPoints(String sessionId) {
        return entityManager.createQuery(
                "SELECT w FROM POINTDATA w WHERE w.sessionId = '" + sessionId + "'",
                PointData.class
        ).getResultList();
    }

    public void deleteAllPoints(String sessionId) {
        entityManager.getTransaction().begin();
        entityManager.createQuery("DELETE FROM POINTDATA p WHERE p.sessionId = '" + sessionId +"'").executeUpdate();
        entityManager.getTransaction().commit();
    }

    public void addResult(Integer x, Double y, Integer r, String sessionId) {
        Boolean hit = area.checkHit(Double.valueOf(x), y, Double.valueOf(r));

        PointData p = new PointData(x, y, r, hit, sessionId);
        entityManager.getTransaction().begin();
        entityManager.persist(p);
        entityManager.getTransaction().commit();
    }
}
