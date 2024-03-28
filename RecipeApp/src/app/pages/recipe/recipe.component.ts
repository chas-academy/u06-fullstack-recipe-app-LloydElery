import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeIdFormatterPipe } from '../../pipes/recipe-id-formatter.pipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RecipeIdFormatterPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      console.log(this.id);
    });
  }
}
