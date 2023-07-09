-- 20230709120001_create_albums_table.sql

CREATE TABLE IF NOT EXISTS albums (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255),
	creator_id INT NOT NULL,
	description VARCHAR(255),
	status ENUM('published', 'draft', 'suspended') DEFAULT 'draft',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
	FOREIGN KEY (creator_id) REFERENCES users(id)
);