package com.paradigmtesting.knock.service.model;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paradigmtesting.knock.model.Note;
import com.paradigmtesting.knock.repository.NoteRepository;

@Service
public class NoteService {
	
	@Autowired
	NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return (List<Note>) noteRepository.findAll();
    }

	public Note saveNote(Note note) {
		return noteRepository.save(note);
	}

	public Note getNoteById(Long id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.orElse(null);
	}

	public void deleteNote(Long id) {
		noteRepository.delete(getNoteById(id));
	}

    public Note updateNote(Long id, Note noteDetails) {
        Optional<Note> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setTitle(noteDetails.getTitle());
            note.setContent(noteDetails.getContent());
            // Add other fields as needed
            return noteRepository.save(note);
        }
        return null;
    }
    
    public List<Note> searchNotesByTitle(String title) {
        return noteRepository.findByTitleContainingIgnoreCase(title);
    }

}
