import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeIdFormatterPipe, NgOptimizedImage],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipes?: Recipe[];

  searchterm = ''; // User search-input: string

  cuisineType = ['American', 'Asian', 'British']; //TODO

  mealType = ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime']; //TODO

  constructor(private recipeService: RecipeService) {}

  searchRecipe() {
    this.recipeService.getRecipes(this.searchterm).subscribe((result) => {
      console.table(result);

      let recipes: Recipe[];
      recipes = result.hits.map(
        (item: {
          recipe: {
            label: any;
            image: any;
            ingredientLines: any;
            totalTime: any;
            yield: any;
          };
          _links: { self: { href: any } };
        }) => {
          return {
            label: item.recipe.label,
            image: item.recipe.image,
            ingredientLines: item.recipe.ingredientLines,
            totalTime: item.recipe.totalTime,
            yield: item.recipe.yield,
            self: item._links.self.href,
          };
        }
      );
      console.log(recipes);
      this.recipes = recipes;
    });
  }
}
