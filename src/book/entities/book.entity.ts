// src/book/entities/book.entity.ts
import { Prisma } from '@prisma/client';

export class Book {
  id: number;
  title: string;
  author: string;
  publicationDate: Date; // Ensure this matches with your entity
}
