CREATE TABLE bills (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    status VARCHAR(20) NOT NULL CHECK (status = ANY ('paid', 'unpaid', 'canceled')),
    study_id INTEGER NOT NULL,
    payment_path TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT bills_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT bills_study_id_fkey FOREIGN KEY (study_id) REFERENCES studies(id) ON DELETE CASCADE,
    CONSTRAINT bills_status_check CHECK (status = ANY ('paid', 'unpaid', 'canceled'))
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 0),
    dni VARCHAR(20) UNIQUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT patients_age_check CHECK (age >= 0)
);

CREATE TABLE studies (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status = ANY ('pending', 'completed', 'canceled')),
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    patient_id INTEGER NOT NULL,
    result_file_path TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT studies_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_role_check CHECK (role = ANY ('admin', 'user', 'doctor'))
);