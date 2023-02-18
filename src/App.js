import { useState, useRef, Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from "./components/AlbumView"
import ArtistView from "./components/ArtistView"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
        e.preventDefault()
        // Fetch Data
        const fetchData = async () => {
            document.title = `${term} Music`
            const response = await fetch(API_URL + term)
            const resData = await response.json()
            if (resData.results.length > 0) {
                // Set State and Context value
                return setData(resData.results)
            } else {
                return setMessage('Not Found')
            }
        }
        fetchData()
    }

    return (
        <div >
            <div className='message'>{message}</div>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <Fragment>
                            <SearchContext.Provider value={{
                                term: searchInput,
                                handleSearch: handleSearch
                            }}>
                                <div className="p-3 mb-2 bg-info text-dark">
                                <SearchBar />
                                </div>
                            </SearchContext.Provider>
                            <DataContext.Provider value={data}>
                                <div className="p-3 mb-2 bg-success text-white">
                                <Gallery />
                                </div>
                            </DataContext.Provider>
                        </Fragment>
                    } />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

