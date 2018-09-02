import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import trackJSON from './tracks.json'
declare var $: any;
declare var require: any;



// declare function require(url: string);
interface Signal {
    SignalName: string;
    lx: number;
    ly: number;
    rx: number;
    ry: number;
    SubdivisionName: string;
}
interface Signals {
    SIGNALS: Array<Signal>;
}
interface Switch {
    SwitchName: string;
    lx: number;
    ly: number;
    rx: number;
    ry: number;
    SubdivisionName: string;
}
interface Switches {
    SWITCHES: Array<Switch>;
}
interface Track {
    TrackName: string;
    lx: number;
    ly: number;
    rx: number;
    ry: number;
    LeftLimitMPRange: number;
    RightLimitMPRange: number;
    TrackNameAlias: string;
    SubdivisionName: string;
}
interface Tracks {
    TRACKS: Array<Track>;
}


@Component({
  selector: 'app-locomotives',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
    public ctx: CanvasRenderingContext2D;
     public signalData: Signals = require('./signals.json');
     public switchData: Switches = require('./switches.json');
    public trackData: Tracks = require('./tracks.json');
    constructor() {}
  ngOnInit() {

        console.log('trackJSON: ' + trackJSON);

      const canvas = <HTMLCanvasElement> document.getElementById('canvas');

      this.ctx = canvas.getContext('2d');
      // this.ctx.fillText('Subdivision: MCCOMB', 300, 300);
      const self = this;
      canvas.addEventListener('mousemove', function (evt) {
          const rect = canvas.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;
          const ctx = canvas.getContext('2d');

          ctx.fillStyle = '#CCCCCC';
          ctx.fillRect(200, 325, 300, 170);
          ctx.font = '12pt Helvetica';
          ctx.fillStyle = 'black';
          // ctx.fillText(message, 610, 255);



          self.trackData.TRACKS.forEach(function (s) {

              if ( self.pDistance(x, y, s.lx, s.ly, s.rx, s.ry) < 10) {
                  self.displayComponent('Track: ' + s.TrackName);
                  ctx.fillText('Track Alias: ' + s.TrackNameAlias, 210, 375);
                  ctx.fillText('Left MP: ' + s.LeftLimitMPRange, 210, 405);
                  ctx.fillText('Right MP: ' + s.RightLimitMPRange, 210, 435);
              }
          });

          self.signalData.SIGNALS.forEach(function (s) {
              if (Math.abs(x - s.lx) < 10 && Math.abs(y - s.ly) < 10) {
                  self.displayComponent('Signal: ' + s.SignalName);
              }
          });

          self.switchData.SWITCHES.forEach(function (s) {
              if (Math.abs(x - s.lx) < 10 && Math.abs(y - s.ly) < 10) {
                  self.displayComponent('Switch: ' + s.SwitchName);
              }
          });


      }, false);

      this.draw(this.ctx);

  }
    drawBlock(ctx, lx, ly, rx, ry) {
        ctx.beginPath();

        ctx.lineWidth = 6;
        ctx.strokeStyle = '#333333';
        ctx.moveTo(lx, ly);
        ctx.lineTo(rx, ry);
        ctx.lineCap = 'round';

        ctx.stroke();
    }

    drawSwitch(ctx, lx, ly) {

        ctx.beginPath();

        ctx.lineWidth = 5;
        ctx.strokeStyle = '#00FF00';
        ctx.moveTo(lx - 2, ly - 2);
        ctx.lineTo(lx + 2, ly - 2);
        ctx.lineTo(lx + 2, ly + 2);
        ctx.lineTo(lx - 2, ly + 2);
        ctx.stroke();
    }

    drawSignal(ctx, lx, ly) {

        const radius = 6;

        ctx.beginPath();
        ctx.arc(lx, ly, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
    draw(ctx) {
        const drawBlock = this.drawBlock;
        const drawSwitch = this.drawSwitch;
        const drawSignal = this.drawSignal;

        this.ctx.fillStyle = '#CCCCcc';
        this.ctx.fillRect(0, 0, 1600, 900);

        this.ctx.font = '18pt Calibri';
        this.ctx.fillStyle = 'black';
        // this.ctx.fillText('Subdivision: MCCOMB', 610, 215);
        this.trackData.TRACKS.forEach(function (track) {
            let dx = 0;
            let dy = 0;

            if (track.rx - track.lx > 1) {
                dx = 4;
            } else if (track.rx - track.lx < -1) {
                dx = 4;
            }
            if (track.ry - track.ly > 1) {
                dy = -4;
            } else if (track.ry - track.ly < -1) {
                dy = 4;
            }

            drawBlock(ctx, track.lx + dx, track.ly - dy, track.rx - dx, track.ry + dy);
        });
        this.switchData.SWITCHES.forEach(function (s) {
            drawSwitch(ctx, s.lx, s.ly);
        });
        this.signalData.SIGNALS.forEach(function (s) {
            drawSignal(ctx, s.lx, s.ly);
        });
    }
    displayComponent(message) {
         // this.ctx.clearRect(610, 275, 290, 250);
        this.ctx.fillStyle = '#CCCCCC';
        this.ctx.fillRect(200, 325, 300, 170);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(message, 210, 345);
    }

    pDistance(x, y, x1, y1, x2, y2) {

        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;
        if (len_sq !== 0) { // in case of 0 length line
            param = dot / len_sq;
        }

        let xx, yy: number;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
