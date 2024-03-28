import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipes', component: RecipesComponent },
];
