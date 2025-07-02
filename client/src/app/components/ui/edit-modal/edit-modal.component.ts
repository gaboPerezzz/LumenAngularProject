import { Component, Input } from '@angular/core';
import { NotesService } from 'src/app/service/notesService/notes.service';
import { ModalService } from 'src/app/service/modalService/modal.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  isModalOpen: boolean = false;
  showConfirm = false;
  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    if (value) {
      this.note = { ...value };
    }
  }
  get data() {
    return this._data;
  }
  constructor(
    private notesService: NotesService,
    private modalService: ModalService
  ) {}
  note = {
    id: 0,
    title: '',
    description: '',
    color: '',
  };

  closeModal() {
    this.modalService.close();
  }

  openConfirmModal() {
    this.showConfirm = true;
  }

  onDeleteConfirmed() {
    this.notesService.deleteNote(this.note.id).subscribe({
      next: () => {
        console.log('Note deleted successfully');
        this.modalService.close();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting note:', err);
      },
    });
  }

  onSubmit() {
    this.notesService.editNote(this.note.id, this.note).subscribe({
      next: (res) => {
        console.log('Note edited successfully:', res);
        this.closeModal();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error editing note:', err);
      },
    });
  }
}
