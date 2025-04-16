import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

const ProductFilters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  
  // Get current filters from URL
  const currentCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000);
  
  // Local state for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentCategory ? [currentCategory] : []
  );
  
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Set initial state based on URL parameters when component mounts
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      setSelectedCategories(currentCategory ? [currentCategory] : []);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [currentCategory, minPrice, maxPrice, isMounted]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Handle category filter
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0]);
    } else {
      params.delete("category");
    }
    
    // Handle price filter
    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    } else {
      params.delete("minPrice");
    }
    
    if (priceRange[1] < 1000) {
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("maxPrice");
    }
    
    // Keep search query if it exists
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }
    
    navigate({ pathname: "/products", search: params.toString() });
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    navigate("/products");
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([category]); // For now, we'll only allow one category
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-mobile-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label 
                        htmlFor={`category-mobile-${category}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={1}
                  onValueChange={(value: number[]) => 
                    setPriceRange(value as [number, number])
                  }
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button onClick={applyFilters}>Apply Filters</Button>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Reset Button */}
        {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="hidden md:flex"
          >
            <X className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        )}
      </div>
      
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={1}
              onValueChange={(value: number[]) => 
                setPriceRange(value as [number, number])
              }
              className="mb-4"
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 flex items-end">
            <Button onClick={applyFilters} className="mr-2">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
