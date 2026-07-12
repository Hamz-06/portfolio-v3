'use client';

import { capitalizeFirstLetter, cn, underscoreToSpace } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import { useTRPC } from '@/backend/trpc/provider';
import { useQuery } from '@tanstack/react-query';
import { ClientCategoryTypes, useCategoryStore } from '@/store/categoryStore';

const BUTTON_BASE_CLASS = 'px-4 py-2 rounded-full text-sm font-light h-8 z-30';
const BUTTON_INACTIVE_CLASS = 'bg-gray-400/30 hover:bg-gray-700/30 text-white';
const BUTTON_ACTIVE_CLASS = 'bg-white text-gray-900';
const GRADIENT_OVERLAY_CLASS =
  'z-1 inset-0 w-full h-full bg-gradient-to-l from-black/50 via-black/60 to-black/45 absolute pointer-events-none';

export function FilterBarHeader() {
  const trpc = useTRPC();
  const { selectedCategory, setCategoryType } = useCategoryStore();

  const { data: categories, isLoading } = useQuery(
    trpc.portfolio.getProjectCategories.queryOptions()
  );

  if (!categories || isLoading) {
    return null; // TODO: Add skeleton loader here
  }

  const handleCategorySelect = (categoryId: ClientCategoryTypes) => {
    if (selectedCategory === categoryId) {
      setCategoryType('all');
      return;
    }
    setCategoryType(categoryId);
  };

  const getButtonClass = (isSelected: boolean) =>
    cn(BUTTON_BASE_CLASS, isSelected ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS);

  return (
    <div className="sticky top-0 z-10 h-16">
      <motion.div className="scrollable-content flex gap-2 justify-start items-center px-2 sm:px-10 w-full h-full bg-green-600 z-20">
        <motion.div className={GRADIENT_OVERLAY_CLASS} />

        <Button
          onClick={() => setCategoryType('all')}
          className={getButtonClass(!selectedCategory)}
        >
          All
        </Button>

        {categories.map((category) => {
          const displayName = underscoreToSpace(capitalizeFirstLetter(category));
          const isSelected = selectedCategory === category;

          return (
            <Button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={getButtonClass(isSelected)}
            >
              {displayName}
            </Button>
          );
        })}
      </motion.div>
    </div>
  );
}
