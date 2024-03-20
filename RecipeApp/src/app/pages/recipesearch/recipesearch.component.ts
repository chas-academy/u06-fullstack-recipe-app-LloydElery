import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.css',
})
export class RecipesearchComponent {
  recipes?: any;

  constructor(private recipeService: RecipeService) {}

  searchRecipe() {
    this.recipeService.getRecipes('chicken').subscribe((res) => {
      console.log(res);
      let recipeArray: any[];
      recipeArray = res.hits;
      console.log(recipeArray);

      let recipes = recipeArray.map((item) => {
        return {
          self: item._link.self.href,
          lable: item.recipe.lable,
          image: item.recipe.image,
          totalTime: item.recipe.totalTime,
          ingredientLines: item.recipe.ingredientLines,
        };
      });
      console.log(recipes);
      this.recipes = recipes;
    });
  }
}
