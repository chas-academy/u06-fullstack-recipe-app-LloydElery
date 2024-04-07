import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';
import { Recipe } from '../../interfaces/recipe';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    RecipeIdFormatterPipe,
    CommonModule,
    NgOptimizedImage,
    TitleCasePipe,
  ],
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
      if (this.id) {
        this.getSingleRecipe();
      }
    });
  }

  getSingleRecipe() {
    this.recipeService.getRecipe(this.id).subscribe((result) => {
      console.table(result);

      let recipe: Recipe = {
        label: result.recipe.label,
        image: result.recipe.image,
        ingredientLines: result.recipe.ingredientLines,
        totalTime: result.recipe.totalTime,
        self: result._links.self.href,
        yield: result.recipe.yield,
        dietLabels: result.recipe.dietLabels,
        cautions: result.recipe.cautions,
        cuisineType: result.recipe.cuisineType,
        mealType: result.recipe.mealType,
        dishType: result.recipe.dishType,
        instructions: result.recipe.instructions,
        tags: result.recipe.tags,
      };
      console.table(recipe);
      this.recipe = recipe;
    });
  }
}
