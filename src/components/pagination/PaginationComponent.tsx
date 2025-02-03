import {useSearchParams} from "react-router-dom";
import './paginationStyles.css';

type PaginationType = {
    lastPage: number;
}

export const PaginationComponent = ({lastPage}:PaginationType) => {
    const [searchParams, setSearchParams] = useSearchParams({page:'1'});
    let currentPage = Number(searchParams.get('page') || '1');

    return (
        <footer className='pagination'>

            <ul className={'paginationList'}>
                <button className='paginationBtn'
                        disabled={currentPage <= 1}
                        onClick={() => {
                            if (currentPage > 1) {
                                setSearchParams({page: (--currentPage).toString()});
                            }
                        }}>
                    Попередня
                </button>

                <h3 className={'h3'}>- {currentPage} -</h3>

                <button className='paginationBtn'
                        disabled={currentPage >= lastPage}
                        onClick={() => {
                            setSearchParams({page: (++currentPage).toString()})
                        }}>
                    Наступна
                </button>
            </ul>
        </footer>
    );
};