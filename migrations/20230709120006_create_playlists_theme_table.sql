-- 20230709120006_create_playlists_theme_table.sql

CREATE TABLE IF NOT EXISTS playlists_theme (
	id INT PRIMARY KEY AUTO_INCREMENT,
	background VARCHAR(50) NOT NULL,
	color ENUM('dark', 'light') NOT NULL,
	playlist_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
	FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);