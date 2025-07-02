import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/service/notesService/notes.service';
import { ModalService } from 'src/app/service/modalService/modal.service';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[] = [];
  constructor(
    private notesService: NotesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe({
      next: (response: any) => {
        this.notes = response.data;
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      },
    });
  }

  openModal(note: Note) {
    this.modalService.open('edit', note);
  }
}
