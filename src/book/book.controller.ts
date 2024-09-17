import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
    BadRequestException,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { Book } from './entities/book.entity';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('books') // Swagger tag for the books API
  @Controller('books')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Get()
    @ApiOperation({ summary: 'Retrieve all books' })
    @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
    async findAll(): Promise<Book[]> {
      return this.bookService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a book by ID' })
    @ApiParam({ name: 'id', type: 'integer', description: 'The ID of the book' })
    @ApiResponse({ status: 200, description: 'Book details', type: Book })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
      return this.bookService.findOne(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiBody({ 
      type: Book,
      description: 'The book data to create',
    })
    @ApiResponse({ status: 201, description: 'The created book', type: Book })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    async create(
      @Body() bookData: { title: string; author: string; publicationDate: string },
    ): Promise<Book> {
      const publicationDate = new Date(bookData.publicationDate);
      if (isNaN(publicationDate.getTime())) {
        throw new BadRequestException('Invalid publication date');
      }
      return this.bookService.create(
        bookData.title,
        bookData.author,
        publicationDate,
      );
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a book by ID' })
    @ApiParam({ name: 'id', type: 'integer', description: 'The ID of the book' })
    @ApiBody({
      type: Book,
      description: 'The new data for the book',
    })
    @ApiResponse({ status: 200, description: 'The updated book', type: Book })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() bookData: { title: string; author: string; publicationDate: string },
    ): Promise<Book> {
      const publicationDate = new Date(bookData.publicationDate);
      if (isNaN(publicationDate.getTime())) {
        throw new BadRequestException('Invalid publication date');
      }
      return this.bookService.update(
        id,
        bookData.title,
        bookData.author,
        publicationDate,
      );
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book by ID' })
    @ApiParam({ name: 'id', type: 'integer', description: 'The ID of the book' })
    @ApiResponse({ status: 204, description: 'Book successfully deleted' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.bookService.remove(id);
    }
  }
  