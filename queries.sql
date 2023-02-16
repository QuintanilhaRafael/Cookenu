-- Active: 1674159747241@@35.226.146.116@3306@jbl-4416851-joao-resende

CREATE TABLE
    IF NOT EXISTS cookenu_users(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM("normal", "admin") DEFAULT "normal"
    );

CREATE TABLE
    IF NOT EXISTS cookenu_recipes(
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cookenu_users(id)
    );

CREATE TABLE
    IF NOT EXISTS cookenu_followers(
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        user_to_follow_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cookenu_users(id),
        FOREIGN KEY (user_to_follow_id) REFERENCES cookenu_users(id)
    );

