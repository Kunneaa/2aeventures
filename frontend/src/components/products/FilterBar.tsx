import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  categories?: string[];
}

interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  sortBy?: 'name' | 'price' | 'newest';
}

export function FilterBar({ onSearch, onFilterChange, categories }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange?.({
      category: category || undefined,
      sortBy,
    });
  };

  const handleSortChange = (sort: 'name' | 'price' | 'newest') => {
    setSortBy(sort);
    onFilterChange?.({
      category: selectedCategory || undefined,
      sortBy: sort,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Filter size={16} />
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sắp xếp</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as 'name' | 'price' | 'newest')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="name">Tên (A-Z)</option>
            <option value="price">Giá (thấp đến cao)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
