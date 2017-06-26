import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { Question, Category, Answer } from '../../../models';
import { CategoryService, QuestionService, TagService } from '../../../services';


@Component({
  selector: 'app-question-add-update',
  templateUrl: './question-add-update.component.html',
  styleUrls: ['./question-add-update.component.scss']
})
export class QuestionAddUpdateComponent implements OnInit, OnDestroy {

  private questionAddUpdateForm: FormGroup;
  private sumitted: boolean;
  private question: Question;

  private categories: Category[] = [];
  private sub: any;

  private tags: string[] = [];
  private sub2: any;
  
  private autoTags: string[] = []; 
  private enteredTags: string[] = [];

  constructor(private _fb: FormBuilder, 
              private _categoryS: CategoryService, 
              private _questionS: QuestionService, 
              private _tagS: TagService, 
              private router: Router) {  }

  ngOnInit() {

    this.question = new Question();
    this.createForm(this.question);
    // get all Categories
    this.sub = this._categoryS.getCategories()
                   .subscribe(categories => this.categories = categories);
    // get all tags
    this.sub2 = this._tagS.getTags()
                   .subscribe(tags => this.tags = tags);

    let questionControl = this.questionAddUpdateForm.get('questionText');
    questionControl.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());
    this.answers.valueChanges.debounceTime(500).subscribe(v => this.computeAutoTags());

  }
  ngOnDestroy() {

    if (this.sub)
      this.sub.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }
  
  get answers(): FormArray { 
    return this.questionAddUpdateForm .get('answers') as FormArray; 
  }
  get tagsArray(): FormArray { 
    return this.questionAddUpdateForm.get('tagsArray') as FormArray; 
  }

  createForm(question: Question) {

    let fgs:FormGroup[] = question.answers
                            .map(answer => {
                                            let fg = new FormGroup({
                                              answerText: new FormControl(answer.answerText, Validators.required),
                                              correct: new FormControl(answer.correct),
                                            });
                              return fg;
                            });
                            
    let answersFA = new FormArray(fgs);
    let fcs: FormControl[] = question.tags
                              .map(tag => {
                                let fc = new FormControl(tag);
                                return fc;
                              });
    if (fcs.length == 0)
      fcs = [new FormControl('')];
    
    let tagsFA = new FormArray(fcs);
    this.questionAddUpdateForm = this._fb.group({
      category: [(question.categories.length>0 ? question.categories[0] : 'nada'), Validators.required],
      questionText: [question.questionText, Validators.required],
      tags: '',
      tagsArray: tagsFA,
      answers: answersFA,
      ordered: [question.ordered],
      explanation: [question.explanation]
    }, {validator: this.questionFormValidator});
  }


  computeAutoTags() {
    let formValue = this.questionAddUpdateForm.value;

    let allTextValues: string[] = [formValue.questionText];
    formValue.answers.forEach(answer => allTextValues.push(answer.answerText));

    let wordString: string = allTextValues.join(" ");

    let matchingTags: string[] = [];
    this.tags.forEach(tag => {
      let patt = new RegExp('\\b(' + tag.replace("+", "\\+") + ')\\b', "ig");
      if (wordString.match(patt))
        matchingTags.push(tag);
    });
    this.autoTags = matchingTags;

    this.setTagsArray();
  }

  setTagsArray() {

    this.tagsArray.controls = [];
    [...this.autoTags, ...this.enteredTags].forEach(tag => this.tagsArray.push(new FormControl(tag)));
  }

  addTag() {
    let tag = this.questionAddUpdateForm.get('tags').value;
    if (tag) {
      if (this.enteredTags.indexOf(tag) < 0)
        this.enteredTags.push(tag);
      this.questionAddUpdateForm.get('tags').setValue('');
    }
  }

  removeEnteredTag(tag) {
    this.enteredTags = this.enteredTags.filter(t => t !== tag); 
  }

  saveQuestion(question: Question) {
    this._questionS.saveQuestion(question)
                    .subscribe(response => {
                      this.router.navigate(['/questions']);
                    });
    
    }

  onSubmit() {
    //validations
    if (this.questionAddUpdateForm.invalid)
      return;
    //get question object from the forms
    let question: Question = this.getQuestionFromFormValue(this.questionAddUpdateForm.value);
    //call saveQuestion
    this.saveQuestion(question);
  }
  
  getQuestionFromFormValue(formValue: any): Question {
    let question: Question;
    question = new Question();
    question.questionText = formValue.questionText;
    question.answers = formValue.answers;
    question.categoryIds = [formValue.category];
    question.tags = [...this.autoTags, ...this.enteredTags]
    return question;
  }

  questionFormValidator(fg: FormGroup): {[key: string]: boolean} {
    
    let answers: Answer[] = fg.get('answers').value;
    
    if (answers.filter(answer => answer.correct).length !== 1)
      return {'correctAnswerCountInvalid': true}
    
    let tags: string[] = fg.get('tagsArray').value;
    if (tags.length  < 3)
      return {'tagCountInvalid': true}
    
    return null;
    }
}