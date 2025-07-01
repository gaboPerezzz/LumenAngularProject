import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesUrl = environment.notesUrl;
  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(this.notesUrl);
  }

  addNote(note: any) {
    return this.http.post(this.notesUrl, note);
  }

  editNote(id: number, note: any) {
    return this.http.put(`${this.notesUrl}/${id}`, note);
  }
}
