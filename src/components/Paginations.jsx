import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import uniqid from "uniqid";
import {setCurrentPage} from "../redux/slices/GeneralSlice";
import {useRouter} from "next/router";
import Link from "next/link";
import {paginationQueryCreator, pathnameWithoutQuery} from "../utils/lib";

const Paginations = (props) => {
    const {count} = props

    const {currentPage, limitPerPage} = useSelector(state => state.general)

    const dispatch = useDispatch()
    const router = useRouter()

    const paginationLink = (page) => {
        if(page > 1){
            return { pathname: router.pathname, query: { ...router.query, page } }
        }
               let newQuery = Object.fromEntries(
                    Object.entries(router.query).reduce((acc, [key, value]) => {
                    if (!['page'].includes(key)) acc.push([key, value]);
                    return acc;
                }, [])
                )
        return { pathname: router.pathname, query: { ...newQuery } }
    }

    React.useEffect(() => {
        if(!router.query.page){
            dispatch(setCurrentPage(1))
            return
        }
        dispatch(setCurrentPage(+router.query.page))
    }, [])


    const paginationQty = Math.ceil(count / limitPerPage)

    if (paginationQty === 1) return null
    const paginationList = Array.from({length : paginationQty}, (_, i) => i + 1)


    return (
        <div className="pagination">
            <ul className="pagination__list">
                {paginationList.map(page => (
                    <li
                        className={classNames('pagination__item',{'--active' : router.query.page ? page === +router.query.page : page ===1} )}
                        key={uniqid()}
                    >
                        {currentPage === page
                            ?<span>{page}</span>
                            :<Link
                                href={paginationLink(page)}
                                onClick={() => dispatch(setCurrentPage(page))}
                            >{page}</Link>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Paginations;