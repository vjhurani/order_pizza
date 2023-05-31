import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent {
  @Input() showChildSuccess: boolean= false;
  @Input() showChildError: boolean= false;
  @Input() errorChild: string = ""
  @Input() successChild: string = "Success"

  fadeOut() {
    setTimeout( () => {
      this.showChildError = false;
      this.showChildSuccess = false;
    }, 4000);
  }
}
