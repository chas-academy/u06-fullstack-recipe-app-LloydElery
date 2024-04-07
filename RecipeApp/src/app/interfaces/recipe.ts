/**
 * label -> titel
 * image
 * ingredientLine -> recipe summary
 * totalTime
 * self
 * yield -> portion amount
 * dietLables -> diet preference
 * ingredients
 */

export interface Recipe {
  label: string;
  image: string;
  ingredientLines: string;
  totalTime: number;
  self: string;
  yield?: number;
  dietLabels?: string;
  cautions?: string;
  cuisineType?: any;
  mealType?: any;
  dishType?: any;
  instructions?: string;
  tags?: string;
}
