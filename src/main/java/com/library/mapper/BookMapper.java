package com.library.mapper;

import com.library.entity.BookEntity; 
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {
    List<BookEntity>selectAll();
    BookEntity selectById(Integer id);
    int insert(BookEntity book);
    int update(BookEntity book);
    int deleteById(Integer id);
}
