-- 20230709120002_create_musics_table.sql

CREATE TABLE IF NOT EXISTS musics (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL UNIQUE,
	status ENUM('published', 'draft', 'suspended') DEFAULT 'draft',
	description VARCHAR(255),
	deleted_at TIMESTAMP NULL,
	album_id INT NOT NULL,
	creator_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (creator_id) REFERENCES users(id),
	FOREIGN KEY (album_id) REFERENCES albums(id)
);