package com.passionroad.passionroad.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PageResponseDTO<E> {

    private int page;
    private int size;
    private int total;

    // start page number
    private int start;
    // end page number
    private int end;

    // is previous page existed?
    private boolean prev;
    // is next page existed?
    private boolean next;

    private List<E> dtoList;

    // constructor
    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(PageRequestDTO pageRequestDTO, List<E> dtoList, int total){

        // post isn't exist
        if(total <= 0){
            return;
        }

        // post is exist
        this.page = pageRequestDTO.getPage();
        this.size = pageRequestDTO.getSize();
        this.total = total; // total page
        this.dtoList = dtoList; // search result list

        this.end = (int)(Math.ceil(this.page / 5.0)) * 5; // end page number
        this.start = this.end - 4; // start page number
        int last = (int)(Math.ceil((total / (double)size))); // last page number

        this.end = end > last ? last : end;

        this.prev = this.start > 1;

        this.next = total > this.end * this.size;
    }
}
