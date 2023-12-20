package org.itmo.secs;

import jakarta.persistence.*;

@Entity(name="POINTDATA")
@Table(name="POINTDATA")
public class PointData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;
    @Column(name="x")
    private Integer x;
    @Column(name="y")
    private Double y;
    @Column(name="r")
    private Integer r;
    @Column(name="hit")
    private Boolean hit;
    @Column(name="session_id")
    private String sessionId;

    public PointData() {}
    public PointData(Integer x, Double y, Integer r, Boolean hit, String sessionId) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.sessionId = sessionId;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Boolean getHit() {
        return hit;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Integer getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }
}
