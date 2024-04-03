/**
 * label -> titel
 * image
 * ingredientLine -> recipe summary
 * totalTime
 * self
 * yield -> portion amount
 * dietLables -> diet preference
 * ingredients //TODO Borde denna vara i en egen interface?
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
  cuisineType?: string;
  mealType?: string;
  dishType?: string;
  instructions?: string;
  tags?: string;
}
