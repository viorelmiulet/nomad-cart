-- Delete all data from related tables first to maintain referential integrity
DELETE FROM order_items;
DELETE FROM product_images;
DELETE FROM products;

-- Reset any sequences if needed
-- Note: UUIDs don't need sequence reset since they use gen_random_uuid()