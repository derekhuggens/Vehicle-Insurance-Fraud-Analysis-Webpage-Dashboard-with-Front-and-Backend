

// <script type="module">
// </script>
// module.exports = require('./config')
// import {password} from '../node-api-postgres/config.js';
//document.writeln("script type='text/javascript", src='../node-api-postgres/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'insurance_fraud_db',
  password: '',
  port: 5432,
})

const getColumns = (request, response) => {
    pool.query('SELECT age, months_as_customer, incident_state, auto_make, auto_model, policy_deductible FROM insurance_claims', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createNewRow = (request, response) => {
    const { age, months_as_customer, incident_state, auto_make, auto_model, policy_deductible } = request.body
  
    pool.query('INSERT INTO insurance_claims (age, months_as_customer, incident_state, auto_make, auto_model, policy_deductible) VALUES ($1, $2, $3, $4, $5, $6)', [age, months_as_customer, incident_state, auto_make, auto_model, policy_deductible], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added: `)
    })
  }

module.exports = {
    getColumns,
    createNewRow,
}
