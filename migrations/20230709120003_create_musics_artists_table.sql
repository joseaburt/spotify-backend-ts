-- 20230709120003_create_musics_artists_table.sql

CREATE TABLE IF NOT EXISTS musics_artists (
	music_id INT NOT NULL,
	artist_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	deleted_at TIMESTAMP NULL,
	FOREIGN KEY (music_id) REFERENCES musics(id),
	FOREIGN KEY (artist_id) REFERENCES users(id) 
);