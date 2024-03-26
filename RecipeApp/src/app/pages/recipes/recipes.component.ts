import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeIdFormatterPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipes?: Recipe[];

  searchterm = 'Chicken'; //TODO Save the search-input here

  cuisineType = ''; //TODO

  mealType = ''; //TODO

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
          };
          _links: { self: { href: any } };
        }) => {
          return {
            lable: item.recipe.label,
            image: item.recipe.image,
            ingredientLines: item.recipe.ingredientLines,
            totalTime: item.recipe.totalTime,
            self: item._links.self.href,
          };
        }
      );
      console.log(recipes);
      this.recipes = recipes;
    });
  }
}
