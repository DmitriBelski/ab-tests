import * as React from 'react'
import './Search.scss'

interface SearchProps {
}

const Search: React.FC<SearchProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState<string>('')

  return (
    <div className="search input-font" data-search-sum="4 tests">
      <input
        className="search__input input-font"
        type="search"
        placeholder="What test are you looking for?"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}

export { Search }
