import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-mesh';

  constructor(private modalService: ModalService) {};
  
  ngOnInit() {
    this.modalService.openModal();
  }
}
