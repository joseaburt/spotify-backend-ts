-- 20230709120007_create_playlists_musics_table.sql

CREATE TABLE IF NOT EXISTS playlists_musics (
	playlist_id INT,
	music_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
	FOREIGN KEY (playlist_id) REFERENCES playlists(id),
	FOREIGN KEY (music_id) REFERENCES musics(id)
);