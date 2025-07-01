import { Component, OnInit } from '@angular/core';
import { AddModalComponent } from '../../ui/add-modal/add-modal.component';
import { ModalService } from 'src/app/service/modalService/modal.service';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isModalOpen = false;
  modalType: string | null = null;
  modalData: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = !!state.type;
      this.modalType = state.type;
      this.modalData = state.data;
    });
  }
}
