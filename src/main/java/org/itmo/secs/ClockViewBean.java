package org.itmo.secs;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Named("clock")
@ApplicationScoped
public class ClockViewBean implements Serializable {
    private final DateTimeFormatter formatter;

    {
        formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    }

    public String getFormatDateTime() {
        LocalDateTime dateTime = LocalDateTime.now();

        return dateTime.format(formatter);
    }
}
