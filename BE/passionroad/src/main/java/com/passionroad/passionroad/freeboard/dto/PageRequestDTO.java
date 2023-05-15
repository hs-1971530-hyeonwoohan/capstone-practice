package com.passionroad.passionroad.freeboard.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestDTO {

    @Builder.Default
    private int page = 1;

    @Builder.Default
    private int size = 10;

    // search type -> t: title, c: content, w: writer, tc: title & content, tw: title & writer, twc: title & writer & content ...
    private String type;    // default is empty

    private String keyword; // default is empty

    private String link;    // default is empty

    // return 'types' as an array
    public String[] getTypes(){
        if(type == null || type.isEmpty()){
            return null;
        }
        return type.split("");  // return array
    }

    // return 'pageable' for paging with
    public Pageable getPageable(String...props){
        return PageRequest.of(this.page - 1, this.size, Sort.by(props).descending());
    }

    // make search types and paging conditions as a string
    public String getLink(){
        if(link == null){
            StringBuilder builder = new StringBuilder();

            // page information
            builder.append("page=" + this.page);
            builder.append("&size=" + this.size);

            // type
            if(type != null && type.length() > 0){
                builder.append("&type=" + type);
            }

            // keyword
            if(keyword != null){
                try{
                    builder.append("&keyword=" + URLEncoder.encode(keyword, "UTF-8"));
                }catch(UnsupportedEncodingException e){}
            }

            link = builder.toString();
        }
        return link;
    }
}
