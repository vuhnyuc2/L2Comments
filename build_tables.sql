CREATE TABLE comments (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		instance_id INT NOT NULL,
        comment TEXT NOT NULL
	);

CREATE TABLE changes(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		instance_id INT NOT NULL,
		field VARCHAR(40) NOT NULL,
		new_info VARCHAR(40) NOT NULL,
		date TIMESTAMP NOT NULL
	);

CREATE TABLE customers (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(80) NOT NULL,
		UNIQUE (name)
	);

CREATE TABLE instances (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		customer_id INT NOT NULL,
		name VARCHAR(20),
		bpm_version VARCHAR(40),
		was_version VARCHAR(40),
		jdk_version VARCHAR(40),
		process_center VARCHAR(40),
		process_server VARCHAR(40),
		os VARCHAR(40),
		bpm_application VARCHAR(40),
		db_type VARCHAR(40),
		db_version VARCHAR(40)
);
