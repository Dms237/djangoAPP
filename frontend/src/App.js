
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [records, setRecords] = useState([]);
    const [newText, setNewText] = useState('');

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/records/');
            setRecords(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createRecord = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/records/', { text: newText });
            setRecords([...records, response.data]);
            setNewText('');
        } catch (error) {
            console.error(error);
        }
    };

    const updateRecord = async (id, updatedText) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/records/${id}/`, { text: updatedText });
            fetchRecords();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Records</h1>
            <ul>
                {records.map(record => (
                    <li key={record.id}>
                        <input
                            value={record.text}
                            onChange={(e) => updateRecord(record.id, e.target.value)}
                        />
                    </li>
                ))}
            </ul>
            <input
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
            />
            <button onClick={createRecord}>Add Record</button>
        </div>
    );
};

export default App;
