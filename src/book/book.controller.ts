import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { Book } from './entities/book.entity';
  
  @Controller('books')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Get()
    async findAll(): Promise<Book[]> {
      return this.bookService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book> {
      const intId = parseInt(id, 10); // Convert to integer
      return this.bookService.findOne(intId);
    }
  
    @Post()
    async create(
      @Body() bookData: { title: string; author: string; publicationDate: string },
    ): Promise<Book> {
      return this.bookService.create(
        bookData.title,
        bookData.author,
        new Date(bookData.publicationDate), // Ensure date is properly parsed
      );
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string, // Param is a string by default
      @Body() bookData: { title: string; author: string; publicationDate: string },
    ): Promise<Book> {
      const intId = parseInt(id, 10); // Convert to integer
      return this.bookService.update(
        intId,
        bookData.title,
        bookData.author,
        new Date(bookData.publicationDate), // Ensure date is properly parsed
      );
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      const intId = parseInt(id, 10); // Convert to integer
      return this.bookService.remove(intId);
    }
  }
  