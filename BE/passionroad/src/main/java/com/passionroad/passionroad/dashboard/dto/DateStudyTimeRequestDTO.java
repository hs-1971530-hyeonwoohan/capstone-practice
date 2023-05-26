package com.passionroad.passionroad.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateStudyTimeRequestDTO {

    private String mid;
    private LocalDate date;
}
