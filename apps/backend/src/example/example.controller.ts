import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  getExampleData() {
    return this.exampleService.getExampleData();
  }

  @Get('date')
  getFormattedDate() {
    return { date: this.exampleService.getFormattedDate() };
  }

  @Post('slug')
  createSlug(@Body('title') title: string) {
    return { slug: this.exampleService.createSlug(title) };
  }

  @Post('clamp')
  clampNumber(
    @Body('value') value: number,
    @Body('min') min: number,
    @Body('max') max: number,
  ) {
    return { result: this.exampleService.clampNumber(value, min, max) };
  }
}
