package com.paradigmtesting.knock.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.paradigmtesting.knock.presenter.NotePresenter;
import com.paradigmtesting.knock.model.Note;

@Component
public class NoteConverter {
	
	public NotePresenter convert(Note note) {

		NotePresenter presenter = new NotePresenter();
		presenter.setId(note.getId());
		presenter.setTitle(note.getTitle());
		presenter.setContent(note.getContent());
		presenter.setUpdatedAt(note.getUpdatedAt());
		presenter.setCreatedAt(note.getCreatedAt());
		
		return presenter;
	}
	
	public List<NotePresenter> convertList(List<Note> notes) {
		return notes.parallelStream().map(this::convert).collect(Collectors.toList());
	}
	
}
