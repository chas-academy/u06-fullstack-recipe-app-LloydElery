import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RecipeIdFormatterPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  recipe?: Recipe;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  // Takes the 'id' from the clicked recipe
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      console.log(this.id);
      if (this.id) {
        this.getSingleRecipe();
      }
    });
  }

  getSingleRecipe() {
    this.recipeService.getRecipe(this.id).subscribe((result) => {
      console.log(result);

      let recipe: Recipe = {
        label: result.recipe.label,
        image: result.recipe.image,
        ingredientLines: result.recipe.ingredientLines,
        totalTime: result.recipe.totalTime,
        self: result.recipe.self,
      };
      console.log(recipe);
    });
  }
}
