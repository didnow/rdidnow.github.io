const express = require('express')
const app = express()
const session = require('express-session');

const PORT = process.env.PORT || 3000

let orders = new Map()
let users = []

app.set('view-engine', 'ejs')
app.use(express.static(`${__dirname}`));
app.use(express.urlencoded({extended: false}));
app.use(session({secret: 'mySecret', resave: true, saveUninitialized: false}))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/profile', (req, res) => {
    if (req.session.username)
        res.render('profile.ejs', { orders: orders.get(req.session.email)})
    else
        res.redirect('/login')
})

app.get('/menu', (req, res) => {
    res.render('menu.ejs')
})

app.get('/reservation', (req, res) => {
    if (req.session.username)
        res.render('reservation.ejs')
    else
        res.redirect('/login')
})

app.post('/reservation', (req, res) => {
    const order = {
        count: req.body.person,
        date: req.body.date,
        time: req.body.time
    }
    if (orders.has(req.session.email)) {
        let arr = orders.get(req.session.email)
        arr.push(order)
        orders.set(req.session.email, arr)
    }
    res.redirect('/profile')
})

app.get('/login', (req, res) => {
    res.render('login.ejs', {errorEmail: req.session.emailNotExistMessage,
        errorPassword: req.session.incorrectPassword})
})

app.post('/login', (req, res) => {
    req.session.emailNotExistMessage = ''
    req.session.incorrectPassword = ''
    const person = {
        email: req.body.email,
        password: req.body.password
    }
    let flag = false
    for (let user of users) {
        if (user.email === person.email) {
            if (user.password === person.password) {
                let curPerson = getPersonByEmail(person.email)
                req.session.username = curPerson.username
                req.session.email = curPerson.email
                res.redirect('/')
                return
            }
            flag = true
        }
    }

    if (flag) {
        req.session.incorrectPassword = 'Неверный пароль'
    }
    else {
        req.session.emailNotExistMessage = 'Несуществующий email'
    }
    res.redirect('/login')
})

function getPersonByEmail(email) {
    for (let user of users) {
        if (user.email === email)
            return user
    }
}

app.get('/register', (req, res) => {
    res.render('register.ejs', {errorEmail: req.session.emailExistMessage})
})

app.post('/register', (req, res) => {
    req.session.emailExistMessage = ''
    const person = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    let flag = true
    for (let user of users) {
        if (user.email === person.email) {
            req.session.emailExistMessage = 'Существующий email'
            flag = false
        }
    }
    if (flag) {
        users.push(person)
        orders.set(person.email, [])
        res.redirect('/login')
        req.session.emailExistMessage = ''
    }
    else {
        res.redirect('/register')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/profile')
})

app.listen(PORT)