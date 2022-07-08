const SQLite3Options = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports = {SQLite3Options};