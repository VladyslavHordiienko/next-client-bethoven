import React from 'react';
import MainLayout from "../layouts/MainLayout";
import {useDispatch} from "react-redux";
import {setInitialSearchValue} from "../redux/slices/GeneralSlice";
import SearchPageCatalog from "../components/SearchPageCatalog";

const Search = (props) => {
    const {searchResult,productAttr} = props

    const dispatch = useDispatch()

    React.useEffect(()=> {
        return () => {
            dispatch(setInitialSearchValue())
        }
    },[])

    return (
        <MainLayout>
            <main className="main">
                <SearchPageCatalog products={searchResult.products} title={"Результати пошуку"} productAttr={productAttr}/>
            </main>
        </MainLayout>
    );
};

export default Search;

export async function getServerSideProps({query}) {
    const resProductAttr = await fetch(`http://localhost:4000/api/productAttr`)
    const productAttr = await resProductAttr.json()

    const resSearch = await fetch(`http://localhost:4000/api/product/?search=${query.search_query}`)
    const searchResult = await resSearch.json()

    if(resProductAttr.status === 404 || resSearch.status === 404) return {notFound:true}

    return { props: { searchResult,productAttr } }
}