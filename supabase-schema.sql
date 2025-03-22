-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  dimensions TEXT NOT NULL,
  amazon_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Add Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
CREATE POLICY "Public products are viewable by everyone" 
  ON products FOR SELECT USING (true);

CREATE POLICY "Products can be inserted by authenticated users" 
  ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products can be updated by authenticated users" 
  ON products FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Products can be deleted by authenticated users" 
  ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for product_variants table
CREATE POLICY "Public product variants are viewable by everyone" 
  ON product_variants FOR SELECT USING (true);

CREATE POLICY "Product variants can be inserted by authenticated users" 
  ON product_variants FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Product variants can be updated by authenticated users" 
  ON product_variants FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Product variants can be deleted by authenticated users" 
  ON product_variants FOR DELETE USING (auth.role() = 'authenticated'); 