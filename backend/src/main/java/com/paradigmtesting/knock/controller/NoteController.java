package com.paradigmtesting.knock.controller;

import java.util.List;

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

import com.paradigmtesting.knock.model.Note;
import com.paradigmtesting.knock.service.model.NoteService;

@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NoteController {
	
    @Autowired
    NoteService noteService;
	
	@GetMapping(path = "/get-all-students")
	public ResponseEntity<List<Note>> getAllNotes() { 
		return ResponseEntity.ok(noteService.getAllNotes()); 
	}
    
	@GetMapping(path = "/test")
	public String test() { 
		return "All notes";
	}
    
	
    @PostMapping(path = "/create")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.saveNote(note));
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }
    
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        return ResponseEntity.ok(noteService.updateNote(id, note));
    }
    
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

}
