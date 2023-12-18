package org.itmo.secs.area.figure;

import org.itmo.secs.area.figure.primitive.Quarter;

public class Point extends Figure {
    @Override
    public boolean checkHit(org.itmo.secs.area.figure.primitive.Point point, Double radius, Quarter q) {
        return false;
    }
}
