import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  id?: string;

  constructor(private route: ActivatedRoute) {}

  ngOninit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(param.get)('id'));
    })
  }

}
