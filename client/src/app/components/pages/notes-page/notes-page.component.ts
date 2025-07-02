import { Component } from '@angular/core';
import { NotesComponent } from '../../ui/notes/notes.component';
import { AuthService } from 'src/app/service/authService/auth.service';
import { NotesService } from 'src/app/service/notesService/notes.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css'],
})
export class NotesPageComponent implements OnInit {
  userName: string | null = null;
  notes: any[] = [];

  constructor(
    private authService: AuthService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getName();
    this.notesService.getNotes().subscribe({
      next: (res) => {
        this.notes = (res as any).data || [];
      },
      error: (err) => {
        console.error('Failed to load notes', err);
        this.notes = [];
      },
    });
  }
}
