import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from 'src/app/interfaces/note'; // Adjust the import path as necessary
interface ModalState {
  type: 'edit' | 'add' | 'confirm' | null;
  data: Note | null;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalState>({
    type: null,
    data: null,
  });

  modalState$ = this.modalState.asObservable();

  open(type: 'edit' | 'add' | 'confirm', data: Note | null = null) {
    this.modalState.next({ type, data });
  }

  close() {
    this.modalState.next({ type: null, data: null });
  }
}
