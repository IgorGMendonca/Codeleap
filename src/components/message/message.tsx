import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NotePencil, Trash } from 'phosphor-react';
import { formatDistanceToNow } from 'date-fns';
import { api } from '../../actions/api';
import './message.scss';
import { DeleteMessage } from './deleteMessage/deleteMessage';
import { EditMessage } from './editMessage/editMessage';

interface PropsLogin {
    login: string;
    atualization: number;
}

interface AllData {
    count: number;
    next: string;
    previous: string | null;
    results: Result[];
}

interface Result {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
}

export function Message(props: PropsLogin) {
    const { login } = props;

    const [allData, setAllData] = useState<AllData>({ count: 0, next: '', previous: null, results: [] });
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 3;
    const offset = currentPage * itemsPerPage;
    const currentItems = allData.results.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allData.results.length / itemsPerPage);

    function fetchData(): void {
        api.get('careers/')
            .then(response => {
                setAllData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleTrashClick(id: number) {
        setSelectedMessageId(id);
        setShowModalDelete(true);
    }

    async function handleDeleteMessage() {
        await api.delete(`careers/${selectedMessageId}/`)
            .then()
            .catch(error => {
                console.error(error);
            });

        fetchData();
        setShowModalDelete(false);
    }

    function handleEditClick(id: number) {
        setSelectedMessageId(id);
        setShowModalEdit(true);
    }

    async function handleEditMessage() {
        fetchData();
        setShowModalEdit(false);
    }

    useEffect(() => {
        fetchData();
    }, [props.atualization]);


    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <>
            {showModalDelete && (
                <DeleteMessage open={showModalDelete} onClose={() => setShowModalDelete(false)} onDelete={handleDeleteMessage} />
            )}

            {showModalEdit && (
                <EditMessage open={showModalEdit} onClose={() => setShowModalEdit(false)} onEdit={handleEditMessage} id={selectedMessageId} />
            )}

            {currentItems.map(result => (
                <main key={result.id}>
                    <div>
                        <header>
                            <h3>{result.title}</h3>

                            {result.username === login && (
                                <div>
                                    <Trash
                                        size={24}
                                        color="#ffffff"
                                        weight="fill"
                                        className='trash'
                                        onClick={() => handleTrashClick(result.id)}
                                    />
                                    <NotePencil
                                        size={24}
                                        color="#ffffff"
                                        weight="fill"
                                        className='notePencil'
                                        onClick={() => handleEditClick(result.id)}
                                    />
                                </div>
                            )}
                        </header>

                        <div>
                            <aside>
                                <span>{result.username}</span>
                                <span>{formatDistanceToNow(new Date(result.created_datetime), { addSuffix: true })}</span>
                            </aside>

                            <span className='last-span'>{result.content}</span>
                        </div>
                    </div>
                </main>
            ))}

            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="previous-page"
                previousLinkClassName="previous-link"
                nextClassName="next-page"
                nextLinkClassName="next-link"
                breakClassName="break-item"
                breakLinkClassName="break-link"
            />

        </>
    );
}
