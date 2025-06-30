import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notesService/notes.service';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  constructor(private notesService: NotesService) {}

  notes: Note[] = [];

  ngOnInit(): void {
    // this.notesService.getNotes().subscribe({
    //   next: (response: any) => {
    //     this.notes = response.data;
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching notes:', error);
    //   },
    // });
  }

  getNotesbyId(id: number) {
    this.notesService.getNoteById(id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching note by ID:', error);
      },
    });
  }
}
