import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    searchValue: '',
    currentPage:1,
    limitPerPage:9
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setInitialSearchValue: (state, action) => {
            state.searchValue = ''
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const {setSearchValue, setInitialSearchValue, setCurrentPage} = generalSlice.actions

export default generalSlice.reducer