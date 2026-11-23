package com.library.service.impl;

import com.library.entity.BookEntity;
import com.library.mapper.BookMapper;
import com.library.service.BookService;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Resource
    private BookMapper bookMapper;

    @Override
    public List<BookEntity> findAll() {
        return bookMapper.selectAll();
    }

    @Override
    public BookEntity selectById(Integer id) {
        return bookMapper.selectById(id);
    }

    @Override
    public int add(BookEntity book) {
        return bookMapper.insert(book);
    }

    @Override
    public int update(BookEntity book) {
        return bookMapper.update(book);
    }

    @Override
    public int delete(Integer id) {
        return bookMapper.deleteById(id);
    }
}
