import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // goals - імя анімації, [] - масив, де будуть перебувати різні функції анімації
    trigger('goals', [
      // * => * - будь-який => до будь-якого (анімація на всі властивості)
      transition('* => *', [
        // query також анімація, :enter - якщо щось увійде в DOM, то opacity: 0 буде 0, інколи анімація перестає працювати
        // якщо не вказати третій параметр true
        query(':enter', style({ opacity: 0 }), {optional: true}),
        // stagger - анімація, яка бере елменти і робить їх з затримкою 300 мс
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}), // тобто десь на середині анімації
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}), // тобто вкінці анімації
          ]))  ]), {optional: true}),

          // leave - коли елемент буде покидати DOM 
          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}), // тобто десь на середині анімації
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}), // тобто вкінці анімації
            ]))  ]), {optional: true})
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res); // тобто беремо результат з нашого сервісу з BehaviorSubject<any>
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals); // тобто оновлюємо масив з цілями
  }
  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals); // Add it here 
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals); // Add it here
  }

}
