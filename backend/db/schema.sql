    -- Japan Travel Database Schema

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Users table
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(500) DEFAULT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Destinations table
    CREATE TABLE IF NOT EXISTS destinations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        category VARCHAR(50) DEFAULT 'general',
        location VARCHAR(200),
        rating DECIMAL(3,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Favorites table
    CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, destination_id)
    );

    -- Messages (contact form)
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- History (viewed destinations)
    CREATE TABLE IF NOT EXISTS history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Seed destinations
    INSERT INTO destinations (name, description, image_url, category, location, rating) VALUES
    ('Mount Fuji', 'Japan''s iconic sacred mountain, standing at 3,776m. A UNESCO World Heritage site offering breathtaking views and spiritual significance throughout the seasons.', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800', 'nature', 'Shizuoka Prefecture', 4.9),
    ('Kyoto - Fushimi Inari', 'Thousands of vermilion torii gates winding through forested hillside paths dedicated to the Shinto god of rice and agriculture.', 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800', 'temple', 'Kyoto', 4.8),
    ('Tokyo - Shibuya Crossing', 'The world''s busiest pedestrian crossing — a mesmerizing choreography of humanity at the heart of modern Tokyo.', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 'city', 'Tokyo', 4.7),
    ('Arashiyama Bamboo Grove', 'A serene path through towering bamboo stalks that filter light into an otherworldly green glow, just outside Kyoto.', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800', 'nature', 'Kyoto', 4.8),
    ('Osaka Castle', 'Magnificent 16th-century castle surrounded by cherry blossom trees — a symbol of Japan''s feudal past rising above a modern metropolis.', 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=800', 'history', 'Osaka', 4.6),
    ('Nara Deer Park', 'Roam freely with over 1,200 wild deer considered sacred messengers of the gods in this ancient capital city.', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800', 'nature', 'Nara', 4.7),
    ('Hiroshima Peace Memorial', 'A powerful symbol of peace and resilience — the A-Bomb Dome standing as a UNESCO World Heritage site and solemn reminder of history.', 'https://upload.wikimedia.org/wikipedia/commons/b/b2/20181111_Hiroshima_Memorial_Cenotaph-1.jpg', 'history', 'Hiroshima', 4.9),
    ('Hakone Hot Springs', 'Relax in traditional onsen baths with stunning views of Mount Fuji across volcanic landscapes and misty valleys.', 'https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=800', 'wellness', 'Kanagawa Prefecture', 4.8),
    ('Okinawa Beaches', 'Crystal-clear turquoise waters, white sand beaches and vibrant coral reefs — Japan''s tropical paradise in the southern islands.', 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=800', 'beach', 'Okinawa', 4.7),
    ('Nikko Toshogu Shrine', 'A lavishly ornate mausoleum dedicated to Tokugawa Ieyasu, decorated with over 5,000 elaborate carvings deep in the mountains.', 'https://images.unsplash.com/photo-1553701800-2e6f41a31b35?w=800', 'temple', 'Tochigi Prefecture', 4.6),
    ('Sapporo Snow Festival', 'Spectacular ice sculptures and snow statues transform Japan''s northern city into a winter wonderland each February.', 'https://images.unsplash.com/photo-1548625519-720595d8d3c5?w=800', 'festival', 'Hokkaido', 4.8),
    ('Kyoto Gion District', 'Wander cobblestone lanes lined with traditional machiya townhouses where geisha culture has been preserved for centuries.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 'culture', 'Kyoto', 4.9)
    ON CONFLICT DO NOTHING;

    -- Create admin user (password: admin123)
    INSERT INTO users (name, email, password, role) VALUES
    ('Admin', 'admin@japantravel.com', '$2b$10$rQZ3GfJqS5RJ5Z5Z5Z5Z5O5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'admin')
    ON CONFLICT DO NOTHING;