import { Component } from '@angular/core';
import { ModalService } from '../../../service/modalService/modal.service';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/service/notesService/notes.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent {
  constructor(
    private modalService: ModalService,
    private notesService: NotesService
  ) {}

  note = {
    title: '',
    description: '',
    color: '#ffffff',
  };

  closeModal() {
    this.modalService.close();
  }
  colors: string[] = ['#D0AE4E', '#4487BF', '#70B76F', '#E63A32'];

  onSubmit() {
    console.log(this.note);
    this.notesService.addNote(this.note).subscribe({
      next: (res) => {
        console.log('Note added successfully:', res);
        this.closeModal();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error adding note:', err);
      },
    });
  }
}
