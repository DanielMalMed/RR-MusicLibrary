import { useState, useContext } from 'react'
import { SearchContext } from '../context/SearchContext'


function SearchBar(){
    // We can comment out our searchTerm state variable as we are not using it!
    // let [searchTerm, setSearchTerm] = useState('')
    const {term, handleSearch} = useContext(SearchContext)

    return (
            <form>
                <input type="text" placeholder="Search Here" ref={term}
                     />
                <input type="submit" onClick={
                        (e) => handleSearch(e, term.current.value)
                    }/>
            </form>
    )
}

export default SearchBar
