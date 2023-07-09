-- 20230709120011_create_users_collections_table.sql

CREATE TABLE IF NOT EXISTS users_collections (
	id INT PRIMARY KEY AUTO_INCREMENT,
	entity_type ENUM('artist', 'playlist') NOT NULL,
	entity_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL,
	creator_id INT NOT NULL
);