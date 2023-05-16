import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";

import styledComponent from "./Filter.style";
const {
  FilterContainer,
  SelectedItem,
  SelectedItemLabel,
  FilterList,
  FilterItem,
} = styledComponent;

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function Filter({
  categories,
  selectedCategory,
  onSelectCategory,
}: FilterProps) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <FilterContainer>
      <SelectedItem>
        <SelectedItemLabel onClick={() => setIsShow(!isShow)}>
          {selectedCategory ? selectedCategory : categories[0]}
          <BiChevronDown
            style={{
              marginRight: "10px",
              marginLeft: "auto",
            }}
          />
        </SelectedItemLabel>
      </SelectedItem>
      {isShow && (
        <FilterList>
          {categories.map((category, index) => (
            <FilterItem
              key={index}
              onClick={() => {
                onSelectCategory(category);
                setIsShow(false);
              }}
            >
              {category}
            </FilterItem>
          ))}
        </FilterList>
      )}
    </FilterContainer>
  );
}

export default Filter;
