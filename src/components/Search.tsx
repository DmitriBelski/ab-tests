import * as React from 'react'
import './Search.scss'

interface SearchProps {
  value: string
  onSearch: (value: string) => void
}

const Search: React.FC<SearchProps> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(e.target.value)
  }

  return (
    <div className="search input-font" data-search-sum="4 tests">
      <input
        className="search__input input-font"
        type="search"
        placeholder="What test are you looking for?"
        value={props.value}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  )
}

export { Search }
