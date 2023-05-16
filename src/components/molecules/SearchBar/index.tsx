import React, { useEffect, useState } from "react";

import { GroupModel } from "../../../apis/groups";

// icon
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";

// styled-components
import styledComponent from "./SearchBar.style";
import Filter from "../../atoms/FIlter";

const {
  SearchBarContainer,
  SearchBarInner,
  SearchBarInput,
  SearchBarSubmitButton,
  SearchHistoryContainer,
  SearchHistoryList,
  SearchHistoryItem,
  ClearHistoryButton,
} = styledComponent;

interface SearchBarProps {
  groups: GroupModel[] | undefined;
  setFilteredPosts: any;
}

const categories = ["모든 그룹", "활성화 그룹"];

function SearchBar({ groups, setFilteredPosts }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const MAX_SEARCH_HISTORY = 5;

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  // 카테고리 선택(Filter 컴포넌트 props)
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // 검색어 입력창에서 엔터키 입력 시 검색
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && handleSearch();
  };

  // 검색 기능 구현
  const handleSearch = () => {
    const searchTerm = searchQuery.toLowerCase();

    let filtered: GroupModel[] | undefined;

    const filterByCategory = (group: GroupModel) => {
      if (selectedCategory === "활성화 그룹") {
        return Number(group.member_count) !== Number(group.members.length) + 1;
      }
      return true;
    };

    if (searchTerm.trim() === "") {
      filtered = groups?.filter(filterByCategory);
    } else {
      filtered = groups?.filter(
        (group) =>
          group.title.toLowerCase().includes(searchTerm) &&
          filterByCategory(group)
      );
    }
    setFilteredPosts(filtered);

    //  검색 기록에 추가
    if (searchTerm.trim() !== "") {
      setSearchHistory((prevHistory) => {
        const updatedHistory = prevHistory
          .filter((query) => query !== searchQuery)
          .slice(0, MAX_SEARCH_HISTORY - 1);
        return [searchQuery, ...updatedHistory];
      });
      setIsSearching(true);
    }
  };

  // 검색 기록 클릭 시 해당 키워드로 검색
  const handleSearchHistoryClick = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  // 개별 검색 기록 삭제
  const handleRemoveSearchHistoryItem = (item: string) => {
    const updatedHistory = searchHistory.filter((query) => query !== item);
    setSearchHistory(() => updatedHistory);
  };

  // 검색어 입력창 초기화(전체 검색 기록)
  const clearSearchHistory = () => {
    setSearchHistory([]);
    setSearchQuery("");
    setIsSearching(false);
  };

  // 검색 후 검색어 입력창 초기화
  const resetSearchQuery = () => {
    if (selectedCategory === "Activation Group") {
      setFilteredPosts(
        groups?.filter(
          (group) =>
            Number(group.member_count) !== Number(group.members.length) + 1
        )
      );
    } else {
      setFilteredPosts(groups);
    }

    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <>
      <SearchBarContainer>
        <SearchBarInner>
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          ></Filter>
          {/* 검색어 입력창 */}
          <SearchBarInput
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            spellCheck="false"
          />
          {/* 검색 버튼 */}
          <SearchBarSubmitButton
            onClick={isSearching ? resetSearchQuery : handleSearch}
          >
            {isSearching ? (
              <VscChromeClose style={{ width: "28px", height: "28px" }} />
            ) : (
              <FiSearch style={{ width: "28px", height: "28px" }} />
            )}
          </SearchBarSubmitButton>
        </SearchBarInner>
      </SearchBarContainer>

      {/* 검색 기록 */}
      <SearchHistoryContainer
        style={
          searchHistory.length > 0
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <SearchHistoryList>
          {searchHistory.map((query, index) => (
            <SearchHistoryItem key={index}>
              <span onClick={() => handleSearchHistoryClick(query)}>
                {query}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSearchHistoryItem(query)}
                style={{ marginLeft: "5px" }}
              >
                <IoCloseOutline />
              </button>
            </SearchHistoryItem>
          ))}
        </SearchHistoryList>
        <ClearHistoryButton onClick={clearSearchHistory}>
          검색기록 삭제
        </ClearHistoryButton>
      </SearchHistoryContainer>
    </>
  );
}

export default SearchBar;
