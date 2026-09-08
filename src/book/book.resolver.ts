import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entity/bookEntity';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async addBooking(
    @Args('seatNumber') seatNumber: string,
    @Args('passengerId') passengerId: number,
    @Args('flightId') flightId: number,
  ) {
    return await this.bookService.createBook(seatNumber, passengerId, flightId);
  }
}
