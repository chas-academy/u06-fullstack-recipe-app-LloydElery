import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeIdFormatter',
  standalone: true,
})
export class RecipeIdFormatterPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value
      .replace('https://api.edamam.com/api/recipes/v2/', '')
      .split('?')[0];
  }
}
