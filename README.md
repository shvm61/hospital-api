# hospital-api

## Overview:

Sample API for the doctors to manage COVID-19 patients.


## Routes:

#### Doctors:

- /doctors/register --> Registration of doctor.

- /doctors/login --> Login of doctor

#### Patients:

- /patients/register ---> Registration of patient

- /patients/:id/create_report ---> Create a testing report of patient

- /patients/:id/all_reports ---> Generate all reports of a particular patient.

#### Other:

- /reports/:status --> Generate all the report based on a particular status.
### Tech Stack : 
- Node, Express, MongoDB.
- Passport is used for Authentication (JWT)
 
## Project Structure:

```
├── config
│   ├── mongoose.js
│   └── passport-jwt-strategy.js
├── controllers
│   ├── doctor_controller.js
│   ├── patient_controller.js
│   └── report_controller.js
├── index.js
├── models
│   ├── doctor.js
│   └── patient.js
├── package-lock.json
├── package.json
└── routes
    ├── doctors.js
    ├── index.js
    └── patients.js
```
