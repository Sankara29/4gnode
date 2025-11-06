
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OverView = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'operator1' || email === 'Operator1' && password === '123admin@987') {
            navigate('/dashboard/node_list')
            sessionStorage.setItem('authdcu', 'ok');

        }
        // alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
        // Add actual auth logic here
    };
    useEffect(() => {
        // Check if auth token exists
        const auth = sessionStorage.getItem('authdcu');

        // If there's no auth and the current URL is not 'https://rdpr.vercel.app/'
        if (auth) {
            navigate('/dashboard/node_list');
        }

    }, []);
    return (
        <div style={styles.container}>
            {/* <div style={styles.vectorBox}>
                <UserVector />
            </div> */}

            <form onSubmit={handleSubmit} style={styles.formBox}>
                <h2 style={styles.heading}>Welcome Kptcl</h2>

                <LabelInput
                    label="Email"
                    type="text"
                    id="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                />

                <LabelInput
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Your password"
                />

                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

// 🔧 Subcomponents

const LabelInput = ({ label, type, id, value, onChange, placeholder }) => (
    <>
        <label htmlFor={id} style={styles.label}>{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            style={styles.input}
        />
    </>
);

const UserVector = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" stroke="#4A90E2" strokeWidth="2" fill="#e3f2fd" />
        <path
            d="M28 25a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 16c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v1H20v-1z"
            fill="#4A90E2"
        />
        <rect x="22" y="42" width="20" height="4" rx="2" fill="#4A90E2" />
        <rect x="26" y="46" width="12" height="2" rx="1" fill="#4A90E2" />
    </svg>
);

// 🎨 Styles

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 40,
        padding: 20,
        backgroundColor: '#f5f7fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    vectorBox: {
        flex: '1 1 25%',
        minWidth: 250,
        maxWidth: 300,
        backgroundColor: '#d9e6f9',
        borderRadius: 20,
        boxShadow: '0 8px 16px rgba(74,144,226,0.25)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    formBox: {
        flex: '1 1 25%',
        minWidth: 300,
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
    },
    heading: {
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    label: {
        marginBottom: 6,
        fontWeight: 600,
        color: '#555',
    },
    input: {
        padding: '12px 14px',
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 8,
        border: '1.5px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '14px 0',
        backgroundColor: '#4A90E2',
        border: 'none',
        borderRadius: 10,
        color: 'white',
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default OverView;

