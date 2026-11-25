CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  category VARCHAR(80) NOT NULL,
  description TEXT NULL,
  price_mwk INT UNSIGNED NOT NULL,
  stock_status ENUM('in_stock','low_stock','out_of_stock') NOT NULL DEFAULT 'in_stock',
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  image_url VARCHAR(500) NULL,
  source_url VARCHAR(500) NULL,
  source_note VARCHAR(500) NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE INDEX products_category_index ON products(category);
CREATE INDEX products_stock_status_index ON products(stock_status);
