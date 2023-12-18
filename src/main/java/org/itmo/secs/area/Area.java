package org.itmo.secs.area;

import com.org.itmo.lab2web.area.figure.Figure;
import com.org.itmo.lab2web.area.figure.primitive.Point;
import com.org.itmo.lab2web.area.figure.primitive.Quarter;

public class Area extends Figure {
    private final Figure firstQuarter;
    private final Figure secondQuarter;
    private final Figure thirdQuarter;
    private final Figure fourthQuarter;

    public Area(Figure firstQuarter, Figure secondQuarter, Figure thirdQuarter, Figure fourthQuarter) {
        this.firstQuarter = firstQuarter;
        this.secondQuarter = secondQuarter;
        this.thirdQuarter = thirdQuarter;
        this.fourthQuarter = fourthQuarter;
    }

    @Override
    public boolean checkHit(Point point, Double radius, Quarter q) {
        switch(q) {
            case FIRST -> {
                return firstQuarter.checkHit(point, radius);
            }
            case SECOND -> {
                return secondQuarter.checkHit(point, radius);
            }
            case THIRD -> {
                return thirdQuarter.checkHit(point, radius);
            }
            case FORTH -> {
                return fourthQuarter.checkHit(point, radius);
            }
        }

        return false;
    }
}


