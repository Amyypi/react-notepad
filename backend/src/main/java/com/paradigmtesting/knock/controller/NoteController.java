package com.paradigmtesting.knock.controller;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paradigmtesting.knock.converter.NoteConverter;
import com.paradigmtesting.knock.model.Note;
import com.paradigmtesting.knock.presenter.NotePresenter;
import com.paradigmtesting.knock.service.model.NoteService;

@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NoteController {
	
    @Autowired
    NoteService noteService;
    
    @Autowired
    NoteConverter noteConverter;
	
	@GetMapping(path = "/get-all-notes")
	public ResponseEntity<List<NotePresenter>> getAllNotes() { 
		List<NotePresenter> notePresenters = noteConverter.convertList(noteService.getAllNotes());
		return ResponseEntity.ok(notePresenters); 
	}
	
    @PostMapping(path = "/create")
    public ResponseEntity<Note> createNote() {
    	Note newNote = new Note();
        return ResponseEntity.ok(noteService.saveNote(newNote));
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<NotePresenter> getNoteById(@PathVariable Long id) {
    	NotePresenter notePresenter = noteConverter.convert(noteService.getNoteById(id));
        return ResponseEntity.ok(notePresenter);
    }
    
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
    	note.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(noteService.updateNote(id, note));
    }
    
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

}
