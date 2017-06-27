import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { AppComponent, CategoriesComponent, TagsComponent, QuestionsComponent, QuestionAddUpdateComponent } from './components';

// Services
import { CategoryService, TagService, QuestionService } from './services';

// Routes
import { routes }   from './app.route';
import { CategoryActions, QuestionActions, TagActions } from './state-management/actions';
import { CategoryEffects, QuestionEffects, TagEffects } from './state-management/effects';
import { default as reducer } from './state-management/state/app.store';

//firebase
import { AngularFireModule } from 'angularfire2';

var firebaseConfig = {
    apiKey: "AIzaSyDYnAsJXasESdwZWKD3f_P6msBsqDzJwXM",
    authDomain: "lquesea-a798c.firebaseapp.com",
    databaseURL: "https://lquesea-a798c.firebaseio.com",
    projectId: "lquesea-a798c",
    storageBucket: "lquesea-a798c.appspot.com",
    messagingSenderId: "313133868861"
  };

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    QuestionsComponent,
    TagsComponent,
    QuestionAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    //store
    StoreModule.provideStore(reducer),
    //ngrx effects
    EffectsModule.run(CategoryEffects),
    EffectsModule.run(QuestionEffects),
    EffectsModule.run(TagEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 20
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    
  ],
  providers: [
    CategoryService, 
    TagService, 
    QuestionService,
    CategoryActions,
    QuestionActions,
    TagActions

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
