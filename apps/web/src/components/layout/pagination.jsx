import {Link} from 'react-router';

const Pagination = ({currentPage, totalPages, url}) => {
    const pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
        i === currentPage
            ? (pageLinks.push(<p key={i}><strong>{`${i}`}</strong></p>))
            : (pageLinks.push(<Link key={i} to={`${url}?page=${i}`}>{`${i}`}</Link>))
        }
    
    return (

            <>
                
                <div className='pages'>
                {currentPage > 1 && (
                    <Link to={`${url}?page=${currentPage - 1}`}>&lt;</Link>
                )}

                {totalPages === 1 
                    ?('')
                    :(pageLinks)
                }
                    
                

                {currentPage < totalPages && (
                    <Link to={`${url}?page=${currentPage + 1}`}>&gt;</Link>
                )}                  
                
            </div>
                
            </>
    )
}

export {Pagination};