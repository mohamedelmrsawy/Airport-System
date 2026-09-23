import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.Entity';
import { CreateBookingDto } from './Dto/craeteBookingDto';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async addBooking(@Args('creatbookingdto') creatbookingdto: CreateBookingDto) {
    return await this.bookService.createBook(creatbookingdto);
  }
}
