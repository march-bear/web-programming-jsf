package org.itmo.secs;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpSession;

import java.io.Serializable;
import java.util.List;

@Named("requestData")
@SessionScoped
public class RequestsDataBean implements Serializable {
    @Inject
    private DataBaseServiceBean resultsData;
    private Integer x;
    private String sessionId;
    private Double y;
    private Integer r;
    private List<PointData> points;

    @PostConstruct
    void init() {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(true);
        sessionId = session.getId();

        points = resultsData.getAllPoints(sessionId);
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

    public Integer getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public void checkHit() {
        resultsData.addResult(x, y, r, sessionId);
    }

    public void clear() {
        resultsData.deleteAllPoints(sessionId);
        points.clear();
    }
    public List<PointData> getPoints() {
        return resultsData.getAllPoints(sessionId);
    }

    public void setPoints(List<PointData> points) {
        this.points = points;
    }
}
