const {createClient} = require('@supabase/supabase-js');
require('dotenv');

const database = createClient(process.env.DATABASE_URL,process.env.DATABASE_API);

module.exports = database;