-- 20230709120009_create_sections_playlists_table.sql

CREATE TABLE IF NOT EXISTS sections_playlists (
	section_id INT,
	playlist_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
	FOREIGN KEY (playlist_id) REFERENCES playlists(id),
	FOREIGN KEY (section_id) REFERENCES sections(id)
);