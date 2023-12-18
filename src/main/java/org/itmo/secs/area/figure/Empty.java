package org.itmo.secs.area.figure;

import org.itmo.secs.area.figure.primitive.Point;
import org.itmo.secs.area.figure.primitive.Quarter;

public class Empty extends Figure {
    @Override
    public boolean checkHit(Point point, Double radius, Quarter q) {
        return false;
    }

    @Override
    public boolean checkHit(Point point, Double radius) {
        return false;
    }

    @Override
    public boolean checkHit(Double x, Double y, Double radius) {
        return false;
    }
}
