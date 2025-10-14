-- Update payment_transactions table to use Algerian Dinar as default currency
ALTER TABLE payment_transactions 
ALTER COLUMN currency SET DEFAULT 'DZD';

-- Update existing records to use DZD
UPDATE payment_transactions 
SET currency = 'DZD' 
WHERE currency = 'EUR' OR currency = 'USD';