package com.library.entity;

import lombok.Data;

@Data
public class BookEntity {
    private Integer id;
    private String bookName;
    private String author;
    private Double price;
    private Integer stock;
    
}
