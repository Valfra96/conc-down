import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { TimeLeft } from '../models/timeLeft';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownDate = new Date(new Date().getFullYear(), 9, 31) //31 Ottobre (9 perche in javascript i mesi partono da 0 che è Gennaio)

  private _timeLeft = new BehaviorSubject<TimeLeft>(this.calculateTimeLeft());
  private _concTime = new BehaviorSubject<boolean>(false);

  timeLeft$ = this._timeLeft.asObservable();
  concTime$ = this._concTime.asObservable();

  constructor() {
    interval(1000).subscribe(() => this.updateCountdown());
  }

  private calculateTimeLeft() {
    const now = new Date();
    const distance = this.countdownDate.getTime() - now.getTime();
    //console.log('Current time:', now);
    //console.log('Distance:', distance);

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    }
  }

  private updateCountdown() {
    const timeLeft = this.calculateTimeLeft();
    //console.log('Time Left:', timeLeft);
    this._timeLeft.next(timeLeft);

    //parte per il check del countdown day
    if (this.checkIfConcTime()) {
      this._concTime.next(true);
    } else {
      this._concTime.next(false)
    }
  }

  //metodo che verifica se la data è 31 ottobre
  private checkIfConcTime(): boolean {
    const now = new Date();
    return now.getDate() === 31 && now.getMonth() === 9; //9 = ottobre 31 è il giorno
  }

}
