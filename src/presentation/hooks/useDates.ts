import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_DOCTORS = 'https://citas-api-h.onrender.com/users/doctors/';
const URL_PATIENTS = 'https://citas-api-h.onrender.com/users/patients/';

export const useDates = (email: string) => {
  const [doctor, setDoctor] = useState({
    id: "",
    email: "",
    name: "",
    last_name: "",
    gender: "",
    phone: "",
    is_staff: false,
    is_active: false,
    speciality: "",
    no_collegiate: ""
  });

  const [patient, setPatient] = useState({
    id: "",
    email: "",
    name: "",
    last_name: "",
    gender: "",
    phone: "",
    is_staff: false,
    is_active: false,
    no_dpi: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTA3MDUzLCJpYXQiOjE3MTY5MzQwNzUsImp0aSI6IjNkNzFiYzY5ODAyNTQzNGNhYjlkZDZlYWVlMzVjNzYzIiwidXNlcl9pZCI6Njd9.vLJreGM0bPYlg_oFx3TC6Cs8Y5TtujLULZBPdLGW0lU';
        console.log(token)
        if (!token) {
          throw new Error('No token found');
        }

        const config = {
          headers: {
            Authorization: token
          }
        };

        const [doctorsResponse, patientsResponse] = await Promise.all([
          axios.get(URL_DOCTORS, config),
          axios.get(URL_PATIENTS, config)
        ]);

        const doctors = doctorsResponse.data;
        const patients = patientsResponse.data;

        console.log(doctors, patients)

        const foundDoctor = doctors.find((doc: any) => doc.email === email);
        const foundPatient = patients.find((pat: any) => pat.email === email);

        if (foundPatient) {
          setPatient({
            id: foundPatient.id,
            email: foundPatient.email,
            name: foundPatient.name,
            last_name: foundPatient.last_name,
            gender: foundPatient.gender,
            phone: foundPatient.phone,
            is_staff: foundPatient.is_staff,
            is_active: foundPatient.is_active,
            no_dpi: foundPatient.no_dpi
          });
        } else if (foundDoctor) {
          setDoctor({
            id: foundDoctor.id,
            email: foundDoctor.email,
            name: foundDoctor.name,
            last_name: foundDoctor.last_name,
            gender: foundDoctor.gender,
            phone: foundDoctor.phone,
            is_staff: foundDoctor.is_staff,
            is_active: foundDoctor.is_active,
            speciality: foundDoctor.speciality,
            no_collegiate: foundDoctor.no_collegiate
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  return [doctor, patient];
};
