-- 20230709120004_create_musics_audio_table.sql

CREATE TABLE IF NOT EXISTS musics_audio (
	id INT PRIMARY KEY AUTO_INCREMENT,
	path VARCHAR(255) NOT NULL,
	music_id INT NOT NULL,
	deleted_at TIMESTAMP NULL,
	duration INT NOT NULL DEFAULT 0,
	format ENUM('mp3', 'mp4') DEFAULT 'mp3',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (music_id) REFERENCES musics(id)
);