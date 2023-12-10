package org.itmo.secs;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named("requestData")
@RequestScoped
public class RequestDataBean implements Serializable {
    private Integer x;
    private Double y;
    private Integer r;
    private Boolean hit;

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
        hit = false;
    }

    public Boolean getHit() {
        return hit;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }
}
