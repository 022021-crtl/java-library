package com.library.service;

import java.util.List;
import com.library.entity.BookEntity;

public interface BookService {
    List<BookEntity>findAll();
    BookEntity selectById(Integer id);
    int add(BookEntity book);
    int delete(Integer id);
    int update(BookEntity book);
}
