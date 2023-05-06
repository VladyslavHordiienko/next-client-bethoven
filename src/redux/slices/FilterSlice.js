import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    selectedFilters: [],
    double: null
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: ((state, action) => {
            state.selectedFilters = [...state.selectedFilters, action.payload]
        }),
        removeFilter: ((state, action) => {
            state.selectedFilters = state.selectedFilters.filter( filter => filter.value_back !== action.payload.value_back)
        }),
        removeAllFilters: ((state, action) => {
            state.selectedFilters = []
        }),
        setDouble:((state,action) => {
            state.double = action.payload
        }),
        removeDouble: ((state,action) => {
            state.double = null
        })

    }
})

export const {addFilter, removeFilter,removeAllFilters,setDouble,removeDouble} = filterSlice.actions

export default filterSlice.reducer