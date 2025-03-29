import { Injectable } from '@nestjs/common';
import { formatDate, slugify, clamp } from '@pmlite/shared/utils';

@Injectable()
export class ExampleService {
  getFormattedDate(): string {
    return formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }

  createSlug(title: string): string {
    return slugify(title);
  }

  clampNumber(value: number, min: number, max: number): number {
    return clamp(value, min, max);
  }

  getExampleData() {
    const now = new Date();
    const title = 'Hello World! This is a test title';
    const value = 150;

    return {
      formattedDate: formatDate(now, 'YYYY-MM-DD HH:mm:ss'),
      slug: slugify(title),
      clampedValue: clamp(value, 0, 100),
    };
  }
}
