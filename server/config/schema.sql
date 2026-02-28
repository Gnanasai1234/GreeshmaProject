-- =============================================
-- DiaPredict — Database Schema
-- Early Diabetes Detection Application
-- =============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS diabetes_db;
USE diabetes_db;

-- =============================================
-- Table 1: users
-- Stores registered doctors and patients
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('doctor', 'patient') NOT NULL DEFAULT 'patient',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Table 2: predictions
-- Stores diabetes prediction results with
-- the 8 input health parameters
-- =============================================
CREATE TABLE IF NOT EXISTS predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pregnancies INT NOT NULL DEFAULT 0,
    glucose INT NOT NULL DEFAULT 0,
    blood_pressure INT NOT NULL DEFAULT 0,
    skin_thickness INT NOT NULL DEFAULT 0,
    insulin FLOAT NOT NULL DEFAULT 0,
    bmi FLOAT NOT NULL DEFAULT 0,
    dpf FLOAT NOT NULL DEFAULT 0,
    age FLOAT NOT NULL DEFAULT 0,
    result ENUM('Diabetic', 'Non-Diabetic') NOT NULL,
    confidence FLOAT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- Table 3: reports
-- Stores doctor notes linked to predictions
-- =============================================
CREATE TABLE IF NOT EXISTS reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prediction_id INT NOT NULL,
    doctor_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prediction_id) REFERENCES predictions(id) ON DELETE CASCADE
);
