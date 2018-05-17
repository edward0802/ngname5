import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  goals: any; 
  // через Dependency Injection добавимо в констрктор аргумент типу ActivatedRoute
  constructor(private myRoute: ActivatedRoute, private myRouter: Router, private _data: DataService) { 
    this.myRoute.params.subscribe(res => console.log(res.id)) // id - наш параметр. Тобто в даному коді ми посилаємо Відповідь (response)

  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.myRouter.navigate(['']); // '' - тобто, щоб на початкову сторінку, так як ми вказали path: '' - то і тут так 
    
  }

}
