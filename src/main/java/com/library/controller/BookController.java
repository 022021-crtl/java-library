package com.library.controller;

import com.library.service.impl.BookServiceImpl;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import com.library.entity.BookEntity;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController{
    @Resource
    private BookServiceImpl bookservice;

    @GetMapping("/list")
    public List<BookEntity> findAll(){
        return bookservice.findAll();
    }

    @GetMapping("/{id}")
    public BookEntity selectById(@PathVariable Integer id){
        return bookservice.selectById(id);
    }
    @PostMapping("/add")
    public int add(@RequestBody BookEntity book){
        return bookservice.add(book);
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable Integer id){
        return bookservice.delete(id);
    }

    @PutMapping("/update")
    public int update(@RequestBody BookEntity book){
        return bookservice.update(book);
    }
}