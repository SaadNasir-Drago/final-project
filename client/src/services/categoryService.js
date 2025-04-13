// Simple category service to provide product categories

export const getCategories = async () => {
    // In a real application, this would fetch from an API
    // For now, we'll return a static list
    const categories = [
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Clothing' },
      { id: 3, name: 'Home & Garden' },
      { id: 4, name: 'Sports & Outdoors' },
      { id: 5, name: 'Toys & Games' },
      { id: 6, name: 'Books' },
      { id: 7, name: 'Health & Beauty' },
      { id: 8, name: 'Automotive' },
      { id: 9, name: 'Office Supplies' },
      { id: 10, name: 'Food & Beverage' }
    ];
    
    return categories;
  };
  