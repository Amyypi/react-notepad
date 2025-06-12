package com.paradigmtesting.knock.presenter;

import java.time.LocalDateTime;

public class NotePresenter {

	private Long id;
	private String title;
	private String content;
	private LocalDateTime updatedAt;
	private LocalDateTime createdAt;
	
	public NotePresenter(Long id, String title, String content, LocalDateTime updatedAt, LocalDateTime createdAt) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.updatedAt = updatedAt;
		this.createdAt = createdAt;
	}
	
	public NotePresenter() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "NotePresenter [id=" + id + ", title=" + title + ", content=" + content + ", updatedAt=" + updatedAt
				+ ", createdAt=" + createdAt + "]";
	}
	
}
