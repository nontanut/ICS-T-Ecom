const db = require("../config/db");

// Create
exports.create = async (req, res) => {
    const {name, gender, style, size, address, price} = req.body;

    // Validate data
    if (!name) {
        return res.status(400).json({message: "Please enter your name!"})
    } else if (!gender) {
        return res.status(400).json({message: "Please enter your gender Men or Women!"});
    } else if (!style) {
        return res.status(400).json({message: "Please select style!"});
    } else if(!size) {
        return res.status(400).json({message: "Please enter your size!"});
    } else if (!address) {
        return res.status(400).json({message: "Please add your address for shipping!"})
    }

    try {
        await db.query(
            "INSERT INTO users(name, gender, style, size, address, price) VALUE(?, ?, ?, ?, ?, ?)", [name, gender, style, size, address, price],
            (err, result, fields) => {
                if (err) {
                    console.log("Error while inserting user data.", err);
                    return res.status(400).send();
                }
                return res.status(201).json({message: "New user created."})
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

// Get all
exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    const page_start = (page - 1) * per_page;
    const gender = req.query.gender;
    const style = req.query.style;
    const size = req.query.size;

    let sql = "SELECT * FROM users";
    const params = [];

    if (gender || style || size) {
        sql += " WHERE gender LIKE ? OR style LIKE ? OR size LIKE ?"
        params.push(gender);
        params.push("%"+style+"%");
        params.push(size);
    }
    sql += " LIMIT ?, ?"
    params.push(page_start);
    params.push(per_page);

    try {
        await db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({message: err.message});
            }
            res.status(200).json(results);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

// Get data by gender
exports.getGender = async (req, res) => {
    const gender = req.params.gender
    try {
        await db.query("SELECT * FROM users WHERE gender = ?", [gender], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({message: err.message});
            }
            res.status(200).json(results);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

// Get data by style
exports.getStyle = async (req, res) => {
    const style = req.params.style
    try {
        await db.query("SELECT * FROM users WHERE style = ?", [style], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({message: err.message});
            }
            res.status(200).json(results);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

// Get data by size
exports.getSize = async (req, res) => {
    const size = req.params.size
    try {
        await db.query("SELECT * FROM users WHERE size = ?", [size], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({message: err.message});
            }
            res.status(200).json(results);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}