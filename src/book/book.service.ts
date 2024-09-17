import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async findOne(id: number): Promise<Book> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async create(title: string, author: string, publicationDate: Date): Promise<Book> {
    return this.prisma.book.create({
      data: {
        title,
        author,
        publicationDate: publicationDate,
      },
    });
  }

  async update(id: number, title: string, author: string, publicationDate: Date): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        publicationDate: publicationDate,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}
