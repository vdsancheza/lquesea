import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent, CategoriesComponent, TagsComponent, QuestionsComponent } from './components/index';

// Services
import { CategoryService, TagService, QuestionService } from './services';

// Routes
import { routes }   from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    QuestionsComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), 
    FormsModule,
    HttpModule
  ],
  providers: [
    CategoryService, 
    TagService, 
    QuestionService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
