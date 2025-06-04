package com.paradigmtesting.knock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.paradigmtesting.knock.model.Note;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {

	@Query("SELECT n FROM Note n WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :title, '%'))")
	List<Note> findByTitleContainingIgnoreCase(@Param("title") String title);

}