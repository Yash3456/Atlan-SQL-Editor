
export const mockQueries = [
  {
    id: 1,
    name: "Select all customers",
    query: "SELECT * FROM customers"
  },
  {
    id: 2,
    name: "Customer order counts",
    query: "SELECT c.customer_id, c.name, c.email, COUNT(o.order_id) as total_orders\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id\nORDER BY total_orders DESC"
  },
  {
    id: 3,
    name: "Product sales analysis",
    query: "SELECT p.product_name, p.category, SUM(oi.quantity) as units_sold, SUM(oi.quantity * oi.unit_price) as revenue\nFROM products p\nJOIN order_items oi ON p.product_id = oi.product_id\nGROUP BY p.product_id\nORDER BY revenue DESC"
  },
  {
    id: 4,
    name: "Monthly sales report",
    query: "SELECT DATE_FORMAT(o.order_date, '%Y-%m') as month,\nCOUNT(DISTINCT o.order_id) as total_orders,\nCOUNT(DISTINCT o.customer_id) as unique_customers,\nSUM(oi.quantity * oi.unit_price) as revenue\nFROM orders o\nJOIN order_items oi ON o.order_id = oi.order_id\nWHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)\nGROUP BY month\nORDER BY month DESC"
  },
  {
    id: 5,
    name: "Customer retention",
    query: "WITH customer_orders AS (\n  SELECT\n    customer_id,\n    YEAR(order_date) as order_year,\n    MONTH(order_date) as order_month\n  FROM orders\n  WHERE order_date >= '2022-01-01'\n  GROUP BY customer_id, order_year, order_month\n)\n\nSELECT\n  this_month.order_year,\n  this_month.order_month,\n  COUNT(DISTINCT this_month.customer_id) as active_customers,\n  COUNT(DISTINCT prev_month.customer_id) as retained_customers,\n  ROUND(COUNT(DISTINCT prev_month.customer_id) / COUNT(DISTINCT this_month.customer_id) * 100, 2) as retention_rate\nFROM customer_orders this_month\nLEFT JOIN customer_orders prev_month\n  ON this_month.customer_id = prev_month.customer_id\n  AND (\n    (this_month.order_month = 1 AND prev_month.order_month = 12 AND prev_month.order_year = this_month.order_year - 1)\n    OR\n    (this_month.order_month > 1 AND prev_month.order_month = this_month.order_month - 1 AND prev_month.order_year = this_month.order_year)\n  )\nGROUP BY this_month.order_year, this_month.order_month\nORDER BY this_month.order_year, this_month.order_month"
  }
];

export const mockResults = [
  // Results for "Select all customers"
  {
    columns: ["customer_id", "name", "email", "phone", "address", "city", "country", "postal_code", "created_at"],
    rows: [
      { customer_id: 1, name: "John Doe", email: "john.doe@example.com", phone: "555-123-4567", address: "123 Main St", city: "New York", country: "USA", postal_code: "10001", created_at: "2022-01-15" },
      { customer_id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "555-987-6543", address: "456 Park Ave", city: "Los Angeles", country: "USA", postal_code: "90001", created_at: "2022-01-18" },
      { customer_id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "555-567-8901", address: "789 Oak St", city: "Chicago", country: "USA", postal_code: "60601", created_at: "2022-01-22" },
      { customer_id: 4, name: "Alice Williams", email: "alice.williams@example.com", phone: "555-345-6789", address: "321 Pine St", city: "Houston", country: "USA", postal_code: "77001", created_at: "2022-01-27" },
      { customer_id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", phone: "555-234-5678", address: "654 Maple St", city: "Phoenix", country: "USA", postal_code: "85001", created_at: "2022-02-03" },
      { customer_id: 6, name: "Diana Martinez", email: "diana.martinez@example.com", phone: "555-876-5432", address: "987 Cedar St", city: "Philadelphia", country: "USA", postal_code: "19101", created_at: "2022-02-08" },
      { customer_id: 7, name: "Edward Wilson", email: "edward.wilson@example.com", phone: "555-456-7890", address: "210 Birch St", city: "San Antonio", country: "USA", postal_code: "78201", created_at: "2022-02-15" },
      { customer_id: 8, name: "Fiona Garcia", email: "fiona.garcia@example.com", phone: "555-678-9012", address: "543 Walnut St", city: "San Diego", country: "USA", postal_code: "92101", created_at: "2022-02-22" },
      { customer_id: 9, name: "George Thompson", email: "george.thompson@example.com", phone: "555-789-0123", address: "876 Elm St", city: "Dallas", country: "USA", postal_code: "75201", created_at: "2022-02-27" },
      { customer_id: 10, name: "Hannah Lee", email: "hannah.lee@example.com", phone: "555-890-1234", address: "109 Spruce St", city: "San Jose", country: "USA", postal_code: "95101", created_at: "2022-03-05" },
      { customer_id: 11, name: "Ian Rodriguez", email: "ian.rodriguez@example.com", phone: "555-901-2345", address: "432 Cherry St", city: "Austin", country: "USA", postal_code: "78701", created_at: "2022-03-12" },
      { customer_id: 12, name: "Julia Kim", email: "julia.kim@example.com", phone: "555-012-3456", address: "765 Aspen St", city: "Jacksonville", country: "USA", postal_code: "32201", created_at: "2022-03-18" }
    ]
  },
  
  // Results for "Customer order counts"
  {
    columns: ["customer_id", "name", "email", "total_orders"],
    rows: [
      { customer_id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", total_orders: 12 },
      { customer_id: 7, name: "Edward Wilson", email: "edward.wilson@example.com", total_orders: 10 },
      { customer_id: 1, name: "John Doe", email: "john.doe@example.com", total_orders: 8 },
      { customer_id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", total_orders: 7 },
      { customer_id: 10, name: "Hannah Lee", email: "hannah.lee@example.com", total_orders: 6 },
      { customer_id: 2, name: "Jane Smith", email: "jane.smith@example.com", total_orders: 5 },
      { customer_id: 8, name: "Fiona Garcia", email: "fiona.garcia@example.com", total_orders: 5 },
      { customer_id: 4, name: "Alice Williams", email: "alice.williams@example.com", total_orders: 4 },
      { customer_id: 6, name: "Diana Martinez", email: "diana.martinez@example.com", total_orders: 3 },
      { customer_id: 11, name: "Ian Rodriguez", email: "ian.rodriguez@example.com", total_orders: 3 },
      { customer_id: 9, name: "George Thompson", email: "george.thompson@example.com", total_orders: 2 },
      { customer_id: 12, name: "Julia Kim", email: "julia.kim@example.com", total_orders: 1 }
    ]
  },
  
  // Results for "Product sales analysis"
  {
    columns: ["product_name", "category", "units_sold", "revenue"],
    rows: [
      { product_name: "Smartphone X", category: "Electronics", units_sold: 145, revenue: 72500.00 },
      { product_name: "Laptop Pro", category: "Electronics", units_sold: 78, revenue: 62400.00 },
      { product_name: "Premium Headphones", category: "Electronics", units_sold: 210, revenue: 31500.00 },
      { product_name: "Designer Watch", category: "Fashion", units_sold: 52, revenue: 15600.00 },
      { product_name: "Fitness Tracker", category: "Electronics", units_sold: 95, revenue: 14250.00 },
      { product_name: "Organic Coffee", category: "Food & Beverage", units_sold: 310, revenue: 9300.00 },
      { product_name: "Leather Wallet", category: "Fashion", units_sold: 73, revenue: 5110.00 },
      { product_name: "Bluetooth Speaker", category: "Electronics", units_sold: 68, revenue: 4760.00 },
      { product_name: "Yoga Mat", category: "Fitness", units_sold: 45, revenue: 2250.00 },
      { product_name: "Stainless Water Bottle", category: "Home & Kitchen", units_sold: 125, revenue: 2125.00 },
      { product_name: "Travel Backpack", category: "Travel", units_sold: 38, revenue: 1900.00 },
      { product_name: "Scented Candle", category: "Home & Kitchen", units_sold: 89, revenue: 1335.00 }
    ]
  },

  // Results for "Monthly sales report"
  {
    columns: ["month", "total_orders", "unique_customers", "revenue"],
    rows: [
      { month: "2023-05", total_orders: 245, unique_customers: 187, revenue: 68540.75 },
      { month: "2023-04", total_orders: 231, unique_customers: 176, revenue: 65320.50 },
      { month: "2023-03", total_orders: 256, unique_customers: 195, revenue: 72145.25 },
      { month: "2023-02", total_orders: 198, unique_customers: 154, revenue: 55430.80 },
      { month: "2023-01", total_orders: 210, unique_customers: 168, revenue: 59875.40 },
      { month: "2022-12", total_orders: 287, unique_customers: 215, revenue: 84320.65 },
      { month: "2022-11", total_orders: 265, unique_customers: 198, revenue: 76540.30 },
      { month: "2022-10", total_orders: 240, unique_customers: 182, revenue: 67890.45 },
      { month: "2022-09", total_orders: 225, unique_customers: 173, revenue: 63250.20 },
      { month: "2022-08", total_orders: 215, unique_customers: 165, revenue: 59680.75 },
      { month: "2022-07", total_orders: 230, unique_customers: 174, revenue: 64320.50 },
      { month: "2022-06", total_orders: 218, unique_customers: 169, revenue: 61450.90 }
    ]
  },

  // Results for "Customer retention"
  {
    columns: ["order_year", "order_month", "active_customers", "retained_customers", "retention_rate"],
    rows: [
      { order_year: 2023, order_month: 5, active_customers: 187, retained_customers: 143, retention_rate: 76.47 },
      { order_year: 2023, order_month: 4, active_customers: 176, retained_customers: 138, retention_rate: 78.41 },
      { order_year: 2023, order_month: 3, active_customers: 195, retained_customers: 149, retention_rate: 76.41 },
      { order_year: 2023, order_month: 2, active_customers: 154, retained_customers: 120, retention_rate: 77.92 },
      { order_year: 2023, order_month: 1, active_customers: 168, retained_customers: 135, retention_rate: 80.36 },
      { order_year: 2022, order_month: 12, active_customers: 215, retained_customers: 165, retention_rate: 76.74 },
      { order_year: 2022, order_month: 11, active_customers: 198, retained_customers: 153, retention_rate: 77.27 },
      { order_year: 2022, order_month: 10, active_customers: 182, retained_customers: 142, retention_rate: 78.02 },
      { order_year: 2022, order_month: 9, active_customers: 173, retained_customers: 136, retention_rate: 78.61 },
      { order_year: 2022, order_month: 8, active_customers: 165, retained_customers: 130, retention_rate: 78.79 },
      { order_year: 2022, order_month: 7, active_customers: 174, retained_customers: 135, retention_rate: 77.59 },
      { order_year: 2022, order_month: 6, active_customers: 169, retained_customers: 132, retention_rate: 78.11 }
    ]
  }
];
