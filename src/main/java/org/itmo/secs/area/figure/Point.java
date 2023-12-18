package org.itmo.secs.area.figure;

import com.org.itmo.lab2web.area.figure.primitive.Quarter;

public class Point extends Figure {
    @Override
    public boolean checkHit(com.org.itmo.lab2web.area.figure.primitive.Point point, Double radius, Quarter q) {
        return false;
    }
}
