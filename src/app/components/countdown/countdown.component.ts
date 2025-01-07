import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from '../../services/countdown.service';
import { TimeLeft } from '../../models/timeLeft';
import confetti from 'canvas-confetti';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.css',
    standalone: false
})
export class CountdownComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  private concSubscription?: Subscription;
  public timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  public isConcTime: boolean = false;


  constructor(private cs: CountdownService) { }
  ngOnInit(): void {
    //console.log('ngOninit called')
    this.subscription = this.cs.timeLeft$.subscribe(timeLeft => {
      //console.log('Recieved Time Left in Component:', timeLeft)
      this.timeLeft = timeLeft
    });

    //verifica del countdown day
    this.concSubscription = this.cs.concTime$.subscribe(isConcTime => {
      this.isConcTime = isConcTime;
      if (isConcTime) {
        this.showConfetti();
      }
    })

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.concSubscription) {
      this.concSubscription.unsubscribe();
    }
  }

  private showConfetti(): void {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 }
    });


  }

}
