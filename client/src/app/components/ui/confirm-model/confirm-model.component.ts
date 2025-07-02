import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from 'src/app/service/modalService/modal.service';
@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.css'],
})
export class ConfirmModelComponent {
  constructor(private modalService: ModalService) {}

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
