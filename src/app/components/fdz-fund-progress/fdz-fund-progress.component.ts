import { Component, OnInit, Input } from '@angular/core';
import { FdzFund, FdzFundPill } from '@fdz/models';

@Component({
  selector: 'fdz-fund-progress',
  templateUrl: './fdz-fund-progress.component.html',
  styleUrls: ['./fdz-fund-progress.component.scss']
})
export class FdzFundProgressComponent implements OnInit {

  percentage = 0;

  @Input() fund: FdzFund;

  constructor() { }

  ngOnInit(): void {
    this.percentage = this.getPercentage();
  }

  get barStyles(): any {
    return {
      background: this.fund.colour.colour,
      width : this.percentage + '%'
    };
  }

  getPercentage(): number {
    return (100 / this.fund.target) * this.fund.current;
  }

  get pillOptions(): FdzFundPill {
    return {
      text: (this.percentage === 100 ?  'Complete' : ((this.percentage > 0) ? 'In Progress' : 'Started'))
    };
  }

}
