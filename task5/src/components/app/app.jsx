import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header';
import MovieInfo from '../movie-info';
import MoviesList from '../movies-list';
import FormComponent from '../form-component/form-component';
import Loader from '../loader';
import './app.css';
const App = () => {
    const [data, setData] = useState([{}]);
    const [formData, setFormData] = useState();
    const [movieData, setMovieData] = useState([{}]);
    const [form, setForm] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [editId, setEditId] = useState();
    const [term, changeTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/movies');
                const data = await response.json();
                setData(data);
            } catch (error) {
                alert('Error');
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        setForm(false);
    }, [movieData]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = isAdd
                    ? await fetch('http://localhost:3000/movies', {
                        method: 'POST',
                        body: JSON.stringify({
                            ...formData,
                            id: data.length + 1,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    : await fetch('http://localhost:3000/movies/${editId}', {
                method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            await response.json();
            const moviesResponse = await fetch('http://localhost:3000/movies');
            const newMovieData = await moviesResponse.json();
            setData(newMovieData);
            setIsAdd(false);
            if (!isAdd) {
                setMovieData(formData);
            }
        } catch (error) {
            alert('Error in fetch!');
        }
    };

        if (formData) {
            fetchData();
        }
    }, [formData, isAdd, editId]);

    function searchPost(data, term) {
        if (!data || data.length === 1) {
            return;
        }
        if (term.length === 0) {
            return data;
        }
        return data.filter(item => {
            return (item.title !== undefined) ? item.title.toLowerCase().includes(term.toLowerCase()) : false;
        });
    }

    function onUpdateSearch(term) {
        changeTerm(term);
    }
    const visible = searchPost(data, term);
    const movieList = visible ? (
        <MoviesList
            data={visible}
            setMovieData={setMovieData}
            setForm={setForm}
            onUpdateSearch={onUpdateSearch}
            setIsAdd={setIsAdd}
        ></MoviesList>
    ) : (
        <Loader />
    );
    const moviePart = form ? (
        <FormComponent setForm={setForm} setFormData={setFormData}></FormComponent>
    ) : (
        <MovieInfo props={movieData} setForm={setForm} setEditId={setEditId}></MovieInfo>
    );
    return (
        <>
            <AppHeader></AppHeader>
            <div className="main-page">
                {movieList}
                {moviePart}
            </div>
        </>
    );
};
export default App;
