import { Component, Injectable } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Recipe } from '../../interfaces/recipe';
import { RouterLink } from '@angular/router';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RecipeIdFormatterPipe,
    NgOptimizedImage,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipes?: Recipe[];

  searchterm = ''; // User search-input: string
  cuisineTypes = [
    '',
    'American',
    'Asian',
    'British',
    'Caribbean',
    'Chinese',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Kosher',
    'Mediterranean',
    'Nordic',
  ];
  mealTypes = ['', 'Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'];

  dishTypes = [
    '',
    'Bread',
    'Cereals',
    'Desserts',
    'Drinks',
    'Panncake',
    'Preps',
    'Preserve',
    'Salad',
    'Sandwiches',
    'Soup',
    'Starter',
    'Sweets',
  ];

  constructor(private recipeService: RecipeService) {}

  searchForm = new FormGroup({
    searchterm: new FormControl(''),
    mealType: new FormControl(''),
    cuisineType: new FormControl(''),
    dishType: new FormControl(''),
  });

  searchData: any;

  searchRecipe() {
    this.searchData = this.searchForm.value;
    let searchterm = this.searchData.searchterm;
    let cuisineType = this.searchData.cuisineType;
    let mealType = this.searchData.mealType;
    let dishType = this.searchData.dishType;

    console.log(this.searchData);
    this.recipeService
      .getRecipes(searchterm, cuisineType, mealType, dishType)
      .subscribe((result) => {
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
              mealType?: any;
            };
            _links: { self: { href: any } };
          }) => {
            return {
              label: item.recipe.label,
              image: item.recipe.image,
              ingredientLines: item.recipe.ingredientLines,
              totalTime: item.recipe.totalTime,
              yield: item.recipe.yield,
              mealType: item.recipe.mealType,
              self: item._links.self.href,
            };
          }
        );
        console.log(recipes);
        this.recipes = recipes;
      });
  }
}
